import bcrypt from "bcryptjs";
import Customer from "../../models/customer-model.js";
import DailyRevenue from "../../models/daily-revenue-model.js";
import Menu from "../../models/menu-model.js";
import CheckoutBucket from "../../models/cutomer-checkout-bucket.js";
import jwt from "jsonwebtoken";
import { UserType } from "../../middleware/auth.js";
import e from "express";

export const registerCustomer = async (req, res) => {
  try {
    // Check if a customer is already registered with this email
    const customerEmailExists = await Customer.exists({
      email: req.body.email,
    });
    if (customerEmailExists) {
      return res
        .status(409)
        .json({ error: "Customer with the given email already exists" });
    }

    // Check if the username is taken
    const customerUsernameExists = await Customer.exists({
      username: req.body.username,
    });
    if (customerUsernameExists) {
      return res
        .status(409)
        .json({ error: `Username '${req.body.username}' is already taken` });
    }

    // Hash customer password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Register customer into the database
    const customer = new Customer({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    await customer.save();
    
    // Register cusotmer checkout bucket
    const newCheckoutBucket = new CheckoutBucket({
      email: req.body.email
      
    });

    console.log("created bucket")
    await newCheckoutBucket.save();
    
    // Return a representation of the registered customer
    const customerRepresentation = {
      email: customer.email,
      username: customer.username,
    };

    return res.status(201).json(customerRepresentation);
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    res.status(500).end();
  }
};

export const loginCustomer = async (req, res) => {
  try {
    // Check if a customer email exists

    const customerEmailExists = await Customer.exists({
      email: req.body.email,
    });
    if (!customerEmailExists) {
      return res.status(404).json({ error: "login failed (email not found)" });
    }

    const customer = await Customer.findOne({ email: req.body.email }).lean();
    // Verify customer password
    const matchedPasswords = await bcrypt.compare(
      req.body.password,
      customer.password
    );
    if (!matchedPasswords) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    jwt.sign(
      { "email": customer.email, "userType": UserType.Customer },
      process.env.API_SECRET,
      { expiresIn: "3 days" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ accessToken: token });
      }
    );
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    res.status(500).end();
  }
};

export const addItem = async (req, res) => {
  try {
    //req.hashedPassword.accessToken
    //const accessToken = await Customer.exists({"email": req.body.email});
    const customerBucket = await CheckoutBucket.findOne({ email: req.userEmail});

    if(!customerBucket){
      return res.status(404).json({ error: "Customer Bucket not found" });
    }

    console.log(typeof(customerBucket));
    const itemsMap = customerBucket.items;

    if (itemsMap.has(req.body.item)) {
      itemsMap.set(req.body.item, itemsMap.get(req.body.item) + 1);
      console.log("Updated", req.body.item, ":", itemsMap.get(req.body.item));
    } else {
      // If the item doesn't exist, add it with a quantity of 1
      itemsMap.set(req.body.item, 1);
      console.log("Added", req.body.item, ":", itemsMap.get(req.body.item));
    }


    console.log(itemsMap);

    // Assuming you want to update the database with the modified map
    await CheckoutBucket.updateOne(
      { email: req.userEmail },
      { items: itemsMap }
    );

    console.log(customerBucket);

    return res
      .status(200)
      .json({ message: "Item added/updated successfully" });
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    res.status(500).end();
  }
};


export const removeItem = async (req, res) => {
  try {
    //req.hashedPassword.accessToken
    //const accessToken = await Customer.exists({"email": req.body.email});
    const customerBucket = await CheckoutBucket.findOne({ email: req.userEmail});

    if(!customerBucket){
      return res.status(404).json({ error: "Customer Bucket not found" });
    }

    console.log(typeof(customerBucket));
    const itemsMap = customerBucket.items;

    if (itemsMap.has(req.body.item) &&  itemsMap.get(req.body.item) !== 0 ) {
      itemsMap.set(req.body.item, itemsMap.get(req.body.item) - 1);
      console.log("Updated", req.body.item, ":", itemsMap.get(req.body.item));
    } else {
      // If the item doesn't exist, throw error
      return res.status(404).json({ error: "Removing empty item" });
    }


    console.log(itemsMap);

    // Assuming you want to update the database with the modified map
    await CheckoutBucket.updateOne(
      { email: req.userEmail },
      { items: itemsMap }
    );

    console.log(customerBucket);

    return res
      .status(200)
      .json({ message: "Item removed successfully" });
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    res.status(500).end();
  }
};



 export const getAllMenuItems = async (req, res) => {
    try {
      const menuItems = await Menu.find();
      console.log("getAllMenuItems start");
      console.log(menuItems);
      console.log("getAllMenuItems fin");

      return res.status(200).json({menuItems});

    } catch (e) {
      console.error(e.message);
      console.error(e.stack);
      res.status(500).end();
    }
  };


  export const checkout = async (req, res) => {
    console.log("Checkout process started");
  
    try {
      const customerBucket = await CheckoutBucket.findOne({ email: req.userEmail });
      
      if (!customerBucket) {
        return res.status(404).json({ error: "Customer Bucket not found" });
      }
  
      const menuItems = await Menu.find();
      const menuMap = new Map(menuItems.map(item => [item.name, item]));
  
      const returnBody = new Map();
  
      // Use for...of to allow await inside the loop
      for (const [itemName, quantity] of customerBucket.items.entries()) {
        const menuItem = menuMap.get(itemName);
        if (menuItem) {
          returnBody.set(menuItem.name, menuItem.price);
  
          // Check if a revenue record for today's date already exists
          const existingRevenueEntry = await DailyRevenue.findOne({
            date: new Date().toISOString().slice(0, 10), // Assuming date is stored as YYYY-MM-DD
            "itemsSold.name": menuItem.name
          });
  
          if (!existingRevenueEntry) {
            // If the revenue record doesn't exist for the item today, create a new one
            await DailyRevenue.updateOne(
              { date: new Date().toISOString().slice(0, 10) },
              {
                $push: {
                  itemsSold: {
                    name: menuItem.name,
                    numUnitsSold: quantity,
                    totalRevenue: menuItem.price * quantity
                  }
                }
              },
              { upsert: true } // If the document with today's date doesn't exist, create it
            );
          } else {
            // If the revenue record exists for the item today, update it
            await DailyRevenue.updateOne(
              {
                date: new Date().toISOString().slice(0, 10),
                "itemsSold.name": menuItem.name
              },
              {
                $inc: {
                  "itemsSold.$.numUnitsSold": quantity,
                  "itemsSold.$.totalRevenue": menuItem.price * quantity
                }
              }
            );
          }
        } 
      }
  
      const returnBodyArray = Array.from(returnBody.entries());


      customerBucket.items.clear();
      await customerBucket.save();   
      return res.status(200).json({ items: customerBucket.items, returnBody: returnBodyArray });
  
    } catch (e) {
      console.error(e.message);
      console.error(e.stack);
      res.status(500).end();
    }
  };
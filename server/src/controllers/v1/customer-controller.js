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
    let  itemsMap = customerBucket.items;
    if (!itemsMap || !(itemsMap instanceof Map)) {
      itemsMap = new Map();
    }


    if (itemsMap && itemsMap.has(req.body.item)) {
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

        //variable for today
        const today = new Date().toISOString().slice(0, 10);

       //All items From Menu, 
        const menuItems = await Menu.find();
        const menuMap = new Map(menuItems.map(item => [item.name, item]));
        console.log("menuMap  :    ", menuMap );
        console.log("mencustomerBucket.items.entries()   :    ", customerBucket.items.entries() );
         

        for (const [itemName, quantity] of customerBucket.items.entries()) {
            const menuItem = menuMap.get(itemName);

            if (menuItem) {
                // Find the existing revenue entry for today's date
                const existingEntry = await DailyRevenue.findOne({
                    date: today,
                    "itemsSold.name": menuItem.name,
                });

                if (existingEntry) {
                    // If the item exists in today's record, update the existing entry
                    console.log("expolosion !");
                    await DailyRevenue.updateOne(
                        {
                            date: today,
                            "itemsSold.name": menuItem.name,
                        },
                        {
                            $inc: {
                                "itemsSold.$.numUnitsSold": quantity,
                                "itemsSold.$.totalRevenue": menuItem.price * quantity,
                            },
                        }
                    );
                    console.log("expolosion ????");
                } else {
                    // If the item does not exist, push a new item into the itemsSold array
                    console.log("expolosion ?$ : :#:rwQ#:RwR:W:RWrsadfvajwfjawkfgjaw");

                    await DailyRevenue.updateOne(
                        { date: today },
                        {
                            $push: {
                                itemsSold: {
                                    name: menuItem.name,
                                    numUnitsSold: quantity,
                                    totalRevenue: menuItem.price * quantity,
                                },
                            },
                        },
                        { upsert: true } // Create document if it doesn't exist
                    );


                    console.log(" no eexpolosion ?$ : :#:rwQ#:RwR:W:RWrsadfvajwfjawkfgjaw233333");
                }
            }
        }

        await CheckoutBucket.updateOne(
          { email: req.userEmail },
          { $set: { items: new Map() } } 
      );


        res.status(200).json({ message: "Checkout successful" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


  
 export const checkoutBucket = async (req, res) => {
  try {
    
    const customerBucket = await CheckoutBucket.findOne({ email: req.userEmail });
    console.log("getAllMenuItems start");
    console.log(customerBucket);
    console.log("getAllMenuItems fin");
    const menuItems = await Menu.find();
    const menuMap = new Map(menuItems.map(item => [item.name, item]));
    const returnBody = new Map();




    for (const [itemName, quantity] of customerBucket.items.entries()) {
      console.log(itemName);
      
      const menuItem = menuMap.get(itemName);
      if (menuItem) {
          returnBody.set(menuItem.name, menuItem.price);
      
      }
      console.log("menuItem ::::::::::::::::::", menuItem);
  }

  const returnBodyObject = Object.fromEntries(returnBody);
  
    console.log( 'returnBody ..........', returnBody);
    return res.status(200).json({"customerBucket": customerBucket , "price": returnBodyObject});

  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    res.status(500).end();
  }
};

import bcrypt from "bcryptjs";
import Customer from "../../models/customer-model.js";

export const registerCustomer = async(req, res) => {

    try {
        // Check if a customer is already registered with this email
        const customerEmailExists = await Customer.exists({"email": req.body.email});
        if (customerEmailExists) {
            return res.status(409).json({"error": "Customer with the given email already exists"});
        }

        // Check if the username is taken
        const customerUsernameExists = await Customer.exists({"username": req.body.username});
        if (customerUsernameExists) {
            return res.status(409).json({"error": `Username '${req.body.username}' is already taken`});
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

        // Return a representation of the registered customer
        const customerRepresentation = {
            email: customer.email,
            username: customer.username
        };

        return res.status(201).json(customerRepresentation);

    } catch (e) {
        console.error(e.message);
        console.error(e.stack)
        res.status(500).end();
    }
}

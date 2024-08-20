import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../models/admin-model.js";

export const registerAdmin = async(req, res) => {

    try {
        // Check if an admin is already registered with this email
        const adminEmailExists = await Admin.exists({"email": req.body.email});
        if (adminEmailExists) {
            return res.status(409).json({"error": "Admin with the given email already exists"});
        }

        // Hash admin password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Register admin into the database
        const admin = new Admin({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashedPassword
        });

        await admin.save();

        // Return a representation of the registered admin
        const adminRepresentation = {
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName
        };

        return res.status(201).json(adminRepresentation);

    } catch (e) {
        console.error(e.message);
        console.error(e.stack);
        res.status(500).end();
    }
}

export const loginAdmin = async(req, res) => {

    try {
        // Search for admin in database
        const admin = await Admin.findOne({"email": req.body.email}).lean();
        if (!admin) {
            return res.status(404).json({"error": "Admin with email not found"});
        }

        // Verify admin password
        const matchedPasswords = await bcrypt.compare(req.body.password, admin.password);
        if (!matchedPasswords) {
            return res.status(401).json({"error": "Incorrect password"});
        }

        // Grant access token
        jwt.sign(
            {"username": admin.username},
            process.env.API_SECRET,
            {"expiresIn": "3 days"},
            (err, token) => {
                if (err) throw err;
                res.status(200).json({"accessToken": token});
            }
        );

    } catch (e) {
        console.error(e.message);
        console.error(e.stack);
        res.status(500).end();
    }
}

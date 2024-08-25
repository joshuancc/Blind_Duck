import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

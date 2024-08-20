import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

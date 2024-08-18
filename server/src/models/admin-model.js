import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

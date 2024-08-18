import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;

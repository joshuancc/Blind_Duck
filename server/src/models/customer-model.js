import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})
const MenuItemTable = mongoose.Schema ({
    name: { type: String,
        required : true,
        unqique: true
    },
    price: {
      type: Number,
      required: true,
      validate : {
        validator : !Number.isInteger
    },
    min: 0},

    storage:{
      type: Number,
      required: true,
      validate : {
        validator : Number.isInteger
    }, min: 0}
})



const Customer = mongoose.model("Customer", customerSchema);

export default Customer;

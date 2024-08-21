import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
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

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

import mongoose from "mongoose";

const MenuItemTable = mongoose.Schema ({
    name: {
        type: String,
        required : true,
        unique: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      default: ""
    },
    storage:{
      type: Number,
      required: true,
      validate : {
        validator : Number.isInteger
      },
      min: 0
    }
})

const Menu = mongoose.model("Menu", MenuItemTable);

export default Menu;

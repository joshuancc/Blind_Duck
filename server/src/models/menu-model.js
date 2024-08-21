import mongoose from "mongoose";

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

const Menu = mongoose.model("Menu", MenuItemTable);

export default Menu;

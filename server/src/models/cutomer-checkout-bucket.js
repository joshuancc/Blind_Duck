import mongoose from "mongoose";

const checkoutBucket = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },
    items: {
        type: Map,
        of: {type: Number, min: 0},
        default: {}
    }
})

const CheckoutBucket = mongoose.model("checkoutBucket", checkoutBucket);

export default CheckoutBucket;

import mongoose from "mongoose";

const dailyRevenueSchema = mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    itemsSold: {
        type: [{
            name: { type: String, required: true, unique: true },
            numUnitsSold: { type: Number, required: true, validate: { validator: Number.isInteger }, min: 0 },
            totalRevenue: { type: Number, required: true, min: 0 }
        }],
        required: true
    }
})

const DailyRevenue = mongoose.model("DailyRevenue", dailyRevenueSchema);

export default DailyRevenue;

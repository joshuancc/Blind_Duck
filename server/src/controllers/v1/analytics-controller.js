import DailyRevenue from "../../models/daily-revenue-model.js";
import moment from "moment";

export const getSalesDistribution = async(req, res) => {

    try {
        // Check if date path parameter is formatted correctly
        if (!moment(req.params.date, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({"error": "Malformed date path parameter"});
        }

        // Fetch requested sales data
        const dailyRevenue = await DailyRevenue.findOne({"date": new Date(req.params.date)}, "-_id itemsSold").lean();
        const salesDistribution = new Map();
        if (dailyRevenue) {
            for (const itemSold of dailyRevenue.itemsSold) {
                salesDistribution.set(itemSold.name, itemSold.numUnitsSold);
            }
        }

        return res.status(200).json(Object.fromEntries(salesDistribution));

    } catch(e) {
        console.error(e.message);
        console.error(e.stack);
        res.status(500).end();
    }
}

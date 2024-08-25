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

export const getRevenueDistribution = async(req, res) => {

    try {
        // Check if date path parameter is formatted correctly
        if (!moment(req.params.date, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({"error": "Malformed date path parameter"});
        }

        // Fetch requested revenue data
        const dailyRevenue = await DailyRevenue.findOne({"date": new Date(req.params.date)}, "-_id itemsSold").lean();
        const revenueDistribution = new Map();
        if (dailyRevenue) {
            for (const itemSold of dailyRevenue.itemsSold) {
                revenueDistribution.set(itemSold.name, itemSold.totalRevenue);
            }
        }

        return res.status(200).json(Object.fromEntries(revenueDistribution));

    } catch(e) {
        console.error(e.message);
        console.error(e.stack);
        res.status(500).end();
    }
}

export const getNumberOfSales = async(req, res) => {

    try {
        // Check that query parameters exist and are formatted correctly
        if (!req.query.start || !moment(req.query.start, "YYYY-MM-DD", true).isValid() || !req.query.end || !moment(req.query.end, "YYYY-MM-DD", true).isValid()) {
            return res.status(400).json({"error": "Malformed query parameters"});
        }

        // Check that the end date does not come before the start date
        const startDate = new Date(req.query.start);
        const endDate = new Date(req.query.end);
        if (endDate < startDate) {
            return res.status(400).json({"error": "End date cannot come before start date"});
        }

        // Fetch requested sales data
        const dailyRevenues = await DailyRevenue.find({"date": {$gte: req.query.start, $lte: req.query.end}}, "-_id").lean();

        // Initialize number of sales for each day as 0
        const currDate = startDate;
        const totalSalesDistribution = new Map();
        while (currDate < endDate) {
            totalSalesDistribution.set(currDate.toISOString().split('T')[0], 0);
            currDate.setDate(currDate.getDate() + 1);
        }
        totalSalesDistribution.set(currDate.toISOString().split('T')[0], 0);

        // Add number of sales to each day with sales
        for (const dailyRevenue of dailyRevenues) {
            let dailyTotal = 0;
            for (const itemSold of dailyRevenue.itemsSold) {
                dailyTotal += itemSold.numUnitsSold;
            }
            totalSalesDistribution.set(dailyRevenue.date.toISOString().split('T')[0], dailyTotal);
        }

        return res.status(200).json(Object.fromEntries(totalSalesDistribution));

    } catch(e) {
        console.error(e.message);
        console.error(e.stack);
        res.status(500).end();
    }
}
export const addRevenue = async(req, res) => {
    try {
        const revenue = new DailyRevenue({
            date: new Date(req.body.date),
            itemsSold: req.body.itemsSold
        });

        await revenue.save();

        return res.status(201).end();

    } catch(e) {
        console.error(e.message);
        console.error(e.stack);
        res.status(500).end();
    }
}
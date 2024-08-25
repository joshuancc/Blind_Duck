import express from "express";
import auth from "../../middleware/auth.js";
import { getSalesDistribution, getRevenueDistribution, getNumberOfSales } from "../../controllers/v1/analytics-controller.js"

const analyticsRouter = express.Router();

analyticsRouter.get("/sales-distribution/:date", [auth], getSalesDistribution);
analyticsRouter.get("/revenue-distribution/:date", [auth], getRevenueDistribution);
analyticsRouter.get("/number-of-sales", [auth], getNumberOfSales);

export default analyticsRouter;

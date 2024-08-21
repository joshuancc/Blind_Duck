import express from "express";
import auth from "../../middleware/auth.js";
import { getSalesDistribution } from "../../controllers/v1/analytics-controller.js"

const analyticsRouter = express.Router();

analyticsRouter.get("/sales-distribution/:date", [auth], getSalesDistribution);

export default analyticsRouter;

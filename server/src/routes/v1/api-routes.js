import express from "express"
import adminRouter from "./admin-routes.js";
import customerRouter from "./customer-routes.js";
import analyticsRouter from "./analytics-routes.js";

const apiV1Router = express.Router();

apiV1Router.use("/admins", adminRouter);
apiV1Router.use("/customers", customerRouter);
apiV1Router.use("/analytics", analyticsRouter);

export default apiV1Router;

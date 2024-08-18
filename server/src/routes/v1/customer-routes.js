import express from "express";
import validateRequest from "../../middleware/validation-middleware.js";
import { registerCustomerSchema } from "../../schemas/v1/customer-schemas.js";
import { registerCustomer } from "../../controllers/v1/customer-controller.js";

const customerRouter = express.Router();

customerRouter.post("/", [validateRequest(registerCustomerSchema)], registerCustomer);

export default customerRouter;

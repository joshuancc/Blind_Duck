import express from "express";
import validateRequest from "../../middleware/validation-middleware.js";
import { registerCustomerSchema, loginCustomerSchema } from "../../schemas/v1/customer-schemas.js";
import { registerCustomer,loginCustomer } from "../../controllers/v1/customer-controller.js";


const customerRouter = express.Router();

customerRouter.post("/", [validateRequest(registerCustomerSchema)], registerCustomer);
customerRouter.post("/login",[validateRequest(loginCustomerSchema)], loginCustomer);
export default customerRouter;

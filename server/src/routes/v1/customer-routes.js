import express from "express";
import validateRequest from "../../middleware/validation-middleware.js";
import auth from "../../middleware/auth.js";
import { registerCustomerSchema, loginCustomerSchema } from "../../schemas/v1/customer-schemas.js";
import { registerCustomer,loginCustomer,addItem,removeItem,getAllMenuItems,checkout,checkoutBucket} from "../../controllers/v1/customer-controller.js";


const customerRouter = express.Router();

customerRouter.post("/", [validateRequest(registerCustomerSchema)], registerCustomer);
customerRouter.post("/login",[validateRequest(loginCustomerSchema)], loginCustomer);
customerRouter.post('/addItem',[auth], addItem); 
customerRouter.post('/removeItem',[auth], removeItem); 
customerRouter.get('/getAllMenuItems', getAllMenuItems); 





customerRouter.get('/checkoutBucket',[auth], checkoutBucket); 
customerRouter.post('/checkout',[auth], checkout); 
export default customerRouter;

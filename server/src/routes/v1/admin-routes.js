import express from "express";
import validateRequest from "../../middleware/validation-middleware.js";
import auth from "../../middleware/auth.js";
import { registerAdminSchema, loginAdminSchema } from "../../schemas/v1/admin-schemas.js";
import { registerAdmin, loginAdmin, getAdminInfo } from "../../controllers/v1/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/", [validateRequest(registerAdminSchema)], registerAdmin);
adminRouter.post("/login", [validateRequest(loginAdminSchema)], loginAdmin);
adminRouter.get("/personal-information", [auth], getAdminInfo);

export default adminRouter;

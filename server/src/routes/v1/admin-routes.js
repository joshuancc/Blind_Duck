import express from "express";
import validateRequest from "../../middleware/validation-middleware.js";
import { registerAdminSchema, loginAdminSchema } from "../../schemas/v1/admin-schemas.js";
import { registerAdmin, loginAdmin } from "../../controllers/v1/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/", [validateRequest(registerAdminSchema)], registerAdmin);
adminRouter.post("/login", [validateRequest(loginAdminSchema)], loginAdmin);

export default adminRouter;

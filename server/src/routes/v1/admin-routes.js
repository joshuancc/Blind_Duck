import express from "express";
import validateRequest from "../../middleware/validation-middleware.js";
import { registerAdminSchema } from "../../schemas/v1/admin-schemas.js";
import { registerAdmin } from "../../controllers/v1/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/", [validateRequest(registerAdminSchema)], registerAdmin);

export default adminRouter;

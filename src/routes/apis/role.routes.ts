import express from "express";
import roleController from "../../controllers/role.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRole } from "../../validators/role.validator";
import { validateHandler } from "../../handlers/validator.handler";

const roleRoute = express.Router();

roleRoute.post("/create-role", authenticate, validateRole, validateHandler, roleController.createRole );

roleRoute.get("/get-user-by-role/:id", authenticate, roleController.getUserByRoleId );

export default roleRoute
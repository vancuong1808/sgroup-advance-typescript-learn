import express from "express";
import roleController from "../../controllers/role.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRole } from "../../validators/role.validator";
import { validateHandler } from "../../handlers/validator.handler";

const roleRoute = express.Router();

roleRoute.post("/add-role", authenticate, validateRole, validateHandler, roleController.addRole );

roleRoute.get("/get-user-by-role/:id", authenticate, roleController.getUsersByRoleId );

roleRoute.get("/get-permission-by-role/:id", authenticate, roleController.getPermissionsByRoleId );

roleRoute.get("get-all-roles", authenticate, roleController.getAllRoles );

roleRoute.put("/update-role/:id", authenticate, validateRole, validateHandler, roleController.updateRole );

roleRoute.delete("/delete-role/:id", authenticate, roleController.deleteRole );

roleRoute.  



export default roleRoute
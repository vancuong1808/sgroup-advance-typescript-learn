import express from "express";
import permissionController from "../../controllers/permission.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { RequiredPermissions } from "../../middlewares/permission.middleware";
import { Permissions } from "../../constants/permission";
import { validatePermission, validatePermissionRole } from "../../validators/permission.validator";
import { validateHandler } from "../../handlers/validator.handler";
const permissionRoute = express.Router();

permissionRoute.post("/add-permission", authenticate, RequiredPermissions( Permissions.ADD_PERMISSION ), validatePermission, validateHandler, permissionController.addPermission );

permissionRoute.get("/get-permission", authenticate, RequiredPermissions( Permissions.VIEW_PERMISSION ), permissionController.getAllPermissions );

permissionRoute.get("/get-permission/:id", authenticate, RequiredPermissions( Permissions.VIEW_PERMISSION ), permissionController.getPermissionById );

permissionRoute.put("/update-permission/:id", authenticate, RequiredPermissions( Permissions.UPDATE_PERMISSION ), validatePermission, validateHandler, permissionController.updatePermission );

permissionRoute.delete("/delete-permission/:id", authenticate, RequiredPermissions( Permissions.DELETE_PERMISSION ), permissionController.deletePermission );

permissionRoute.post("/assign-permission-to-role", authenticate, RequiredPermissions( Permissions.ASSIGN_PERMISSION_TO_ROLE ), validatePermissionRole, validateHandler, permissionController.assignPermissionsToRole );

permissionRoute.delete("/remove-permission-from-role/:id", authenticate, RequiredPermissions( Permissions.REMOVE_PERMISSION_FROM_ROLE ), validatePermissionRole, validateHandler, permissionController.removePermissionsFromRole );

export default permissionRoute
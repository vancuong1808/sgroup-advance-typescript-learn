import { RequiredPermissions } from './../../middlewares/permission.middleware';
import express from "express";
import roleController from "../../controllers/role.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { validateRemoveUserRole, validateRole, validateUserRole } from "../../validators/role.validator";
import { validateHandler } from "../../handlers/validator.handler";
import { Permissions } from '../../constants/permission';

const roleRoute = express.Router();

roleRoute.post("/add-role", authenticate, RequiredPermissions( Permissions.ADD_ROLE ), validateRole, validateHandler, roleController.addRole );

roleRoute.get("/get-user-by-role/:id", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getUsersByRoleId );

roleRoute.get("/get-permission-by-role/:id", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getPermissionsByRoleId );

roleRoute.get("/get-all-roles", authenticate, RequiredPermissions( Permissions.VIEW_ROLE ), roleController.getAllRoles );

roleRoute.put("/update-role/:id", authenticate, RequiredPermissions( Permissions.UPDATE_ROLE ), validateRole, validateHandler, roleController.updateRole );

roleRoute.delete("/delete-role/:id", authenticate, RequiredPermissions( Permissions.DELETE_ROLE ), roleController.deleteRole );

roleRoute.post("/assign-roles-to-user", authenticate, RequiredPermissions( Permissions.ASSIGN_ROLE_TO_USER ), validateUserRole, validateHandler, roleController.assignRolesToUser );

roleRoute.delete("/remove-roles-from-user/:id", authenticate, RequiredPermissions( Permissions.REMOVE_ROLE_FROM_USER ), validateRemoveUserRole, validateHandler, roleController.removeRolesFromUser );


export default roleRoute
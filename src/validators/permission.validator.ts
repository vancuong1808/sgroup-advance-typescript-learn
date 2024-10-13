import { body } from "express-validator"

export const validatePermission = [
    body('permissionName')
        .notEmpty().withMessage("Permission name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Permission name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Permission name not have any spaces")
        .matches(/^[A-Z]+_[A-Z]+$/).withMessage("Permission must be follow this form [A-Z]_[A-Z]"),
]

export const validatePermissionRole = [
    body('roleId')
        .notEmpty().withMessage("RoleId must be not empty")
        .isLength({ min: 1 }).withMessage("RoleId at least 1 number")
        .isNumeric().withMessage("RoleId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("RoleId not have any spaces"),
    body('permissionId')
        .notEmpty().withMessage("PermissionId must be not empty")
        .isLength({ min: 1 }).withMessage("PermissionId at least 1 number")
        .isNumeric().withMessage("PermissionId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("PermissionId not have any spaces"),
]

export const validateRemovePermissionRole = [
    body('permissionId')
        .notEmpty().withMessage("PermissionId must be not empty")
        .isLength({ min: 1 }).withMessage("PermissionId at least 1 number")
        .isNumeric().withMessage("PermissionId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("PermissionId not have any spaces"),
]
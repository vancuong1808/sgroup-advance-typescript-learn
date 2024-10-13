import { body } from "express-validator"

export const validateRole = [
    body('roleName')
        .notEmpty().withMessage("Role name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Role name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Role name not have any spaces")
        .matches(/^[A-Z]$/).withMessage("Role name mus be uppercase"),
]

export const validateUserRole = [
    body('userId')
        .notEmpty().withMessage("UserId must be not empty")
        .isLength({ min: 1 }).withMessage("UserId at least 1 number")
        .isNumeric().withMessage("UserId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("UserId not have any spaces"),
    body('roleId')
        .notEmpty().withMessage("RoleId must be not empty")
        .isLength({ min: 1 }).withMessage("RoleId at least 1 number")
        .isNumeric().withMessage("RoleId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("RoleId not have any spaces"),
]

export const validateRemoveUserRole = [
    body('roleId')
        .notEmpty().withMessage("RoleId must be not empty")
        .isLength({ min: 1 }).withMessage("RoleId at least 1 number")
        .isNumeric().withMessage("RoleId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("RoleId not have any spaces"),
]
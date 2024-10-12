import { body } from "express-validator"

export const validateRole = [
    body('role_name')
        .notEmpty().withMessage("Role name must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Role name at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Role name not have any spaces")
        .matches(/^[A-Z].*$/).withMessage("Uppercase the first Letter"),
]
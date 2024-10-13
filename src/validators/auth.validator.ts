import { body } from "express-validator";

export const validateRegister = [
    body('username')
        .notEmpty().withMessage("Username must be not empty")
        .isLength({ min: 6, max: 32 }).withMessage("Username at least 6 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Username not have any spaces"),
    body('email')
        .notEmpty().withMessage("Email must be not empty")
        .isEmail().withMessage("Email not valid"),
    body('password')
        .notEmpty().withMessage("Password must be not empty")
        .isLength({ min: 6, max: 32 }).withMessage("Password at least 6 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Password not have any spaces"),
    body('confirmPassword')
        .notEmpty().withMessage("ConfirmPassword must be not empty")
        .isLength({ min: 6, max: 32 }).withMessage("ConfirmPassword at least 6 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("ConfirmPassword not have any spaces"),
]

export const validateLogin = [
    body('email')
        .notEmpty().withMessage("Email must be not empty")
        .isEmail().withMessage("Email not valid"),
    body('password')
        .notEmpty().withMessage("Password must be not empty")
        .isLength({ min: 6, max: 32 }).withMessage("Password at least 6 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Password not have any spaces"),
]
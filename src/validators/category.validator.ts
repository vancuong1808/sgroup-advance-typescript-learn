import { validateBook } from './book.validator';
import { body } from "express-validator"

export const validateCategory = [
    body('categoryName')
        .notEmpty().withMessage("CatgeoryName must be not empty")
        .isLength({ min: 1, max: 100 }).withMessage("CategoryName at least 1 characters and maximum 100 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("CategoryName not have any spaces"),
]




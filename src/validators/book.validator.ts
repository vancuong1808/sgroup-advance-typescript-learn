import { body } from "express-validator"

export const validateBook = [
    body('title')
        .notEmpty().withMessage("Title must be not empty")
        .isLength({ min: 1, max: 255 }).withMessage("Title at least 1 characters and maximum 255 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Title not have any spaces"),
    body('author')
        .notEmpty().withMessage("Author must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Author at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Author not have any spaces"),
]

export const validateBookTitle = [
    body('title')
    .notEmpty().withMessage("Title must be not empty")
    .isLength({ min: 1, max: 255 }).withMessage("Title at least 1 characters and maximum 255 characters")
    .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Title not have any spaces"),
]

export const validateBookAuthor = [
    body('author')
        .notEmpty().withMessage("Author must be not empty")
        .isLength({ min: 1, max: 32 }).withMessage("Author at least 1 characters and maximum 32 characters")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("Author not have any spaces"),
]

export const validateBookCategory = [
    body('categoryId')
        .notEmpty().withMessage("CategoryId must be not empty")
        .isLength({ min: 1 }).withMessage("CategoryId at least 1 number")
        .isNumeric().withMessage("CategoryId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("CategoryId not have any spaces"),
    body('bookId')
        .notEmpty().withMessage("BookId must be not empty")
        .isLength({ min: 1 }).withMessage("BookId at least 1 number")
        .isNumeric().withMessage("BookId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("BookId not have any spaces"),
]

export const validateRemoveBookCategory = [
    body('bookId')
        .notEmpty().withMessage("BookId must be not empty")
        .isLength({ min: 1 }).withMessage("BookId at least 1 number")
        .isNumeric().withMessage("BookId must be a number")
        .matches(/^(?!\s{1})(.*(?!\s{2}).*)(?<!\s{1})$/).withMessage("BookId not have any spaces"),    
]

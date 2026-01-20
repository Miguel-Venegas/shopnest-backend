import { body } from "express-validator";

export const validateSignup = [
    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        
        .matches(/[a-z]/)
        .withMessage("Password must contain at least one lowercase letter")

        .matches(/[A-Z]/)
        .withMessage("Password must contain at least one uppercase letter")

        .matches(/[0-9]/)
        .withMessage("Password must contain at least one number")

        .matches(/[^A-Za-z0-9]/)
        .withMessage("Password must contain at least one symbol"),
        

    body("passwordConfirmation")
        .notEmpty().withMessage("Password confirmation is required")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match"),

    body("firstName")
        .trim()
        .notEmpty().withMessage("First name is required"),

    body("lastName")
        .trim()
        .notEmpty().withMessage("Last name is required"),

    body("businessName")
        .trim()
        .notEmpty().withMessage("Business name is required"),
];

export const validateSignin = [
    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

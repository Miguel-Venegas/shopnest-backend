const { body } = require('express-validator');

exports.validateProduct = [
  // name
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  // price
  body('price')
    .exists()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0'),

  // description
  body('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  // imageUrl
  body('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Image URL is required')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Image must be a valid HTTP or HTTPS URL'),

  // stockQuantity
  body('stockQuantity')
    .exists()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be an integer ≥ 0'),
];

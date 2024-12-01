const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreateUser = [
    check('dni')
        .exists()
        .withMessage('DNI is required')
        .isLength({ min: 8, max: 12 })
        .withMessage('DNI must be between 8 and 12 characters long'),

    check('name')
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),

    check('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email'),

    check('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    check('role')
        .optional()  // Role es opcional, pero si está presente, debe cumplir con los valores permitidos
        .isIn(['user', 'admin'])
        .withMessage('Role must be either user or admin'),

    check('address')
        .optional()  // Dirección es opcional
        .isString()
        .withMessage('Address must be a string'),

    check('phone')
        .optional()  // Teléfono es opcional
        .isString()
        .withMessage('Phone must be a string')
        .isLength({ min: 9, max: 20 })
        .withMessage('Phone must be between 9 and 20 digits long'),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateCreateUser };

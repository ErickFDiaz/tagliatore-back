const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateCreateUser = [
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

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateCreateUser };

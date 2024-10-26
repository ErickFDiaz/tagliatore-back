const { validationResult } = require('express-validator'); //TODO:
const responseHandler = require('../helpers/handleResponse');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        const responseCreated = responseHandler.error('Validation Error', err.array());
        return responseHandler.send(res, responseCreated);
    }
}

module.exports = { validateResult }
const responseHandler = require('../helpers/handleResponse');
const checkOrigin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        if (token === '123456') {
            next()
        } else {
            const response = responseHandler.forbiddenError('You do not have permission to access this resource');
            responseHandler.send(res, response);
        }

    } catch (e) {
        next()
    }

}

module.exports = checkOrigin
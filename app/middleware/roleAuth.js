const { verifyToken } = require('../helpers/generateToken');
const userService = require('../services/users');
const responseHandler = require('../helpers/handleResponse');

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const userData = await userService.getUserById(tokenData._id);


        if ([].concat(roles).includes(userData.role)) {
            next();
        } else {
            const response = responseHandler.forbiddenError('You do not have permission to access this resource');
            responseHandler.send(res, response);
        }
    } catch (e) {
        const response = responseHandler.forbiddenError('Access denied!');
        responseHandler.send(res, response);
    }
}

module.exports = checkRoleAuth;
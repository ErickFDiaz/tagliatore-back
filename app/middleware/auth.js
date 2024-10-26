
const { verifyToken } = require('../helpers/generateToken')
const responseHandler = require('../helpers/handleResponse');

const checkAuth = async (req, res, next) => {
    try {
        //TODO: authorization: Bearer 1010101010101001010100 
        const token = req.headers.authorization.split(' ').pop() //TODO:123123213
        const tokenData = await verifyToken(token)
        if (tokenData._id) {
            next()
        } else {
            const response = responseHandler.forbiddenError('You do not have permission to access this resource');
            responseHandler.send(res, response);
        }

    } catch (e) {
        const response = responseHandler.forbiddenError('You do not have permission to access this resource');
        responseHandler.send(res, response);
    }

}

module.exports = checkAuth
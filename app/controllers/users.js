const userService = require('../services/users');
const responseHandler = require('../helpers/handleResponse');

/**
 * Get all users
 */
const getItems = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        const response = responseHandler.success('Users retrieved successfully', users);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Get all active users
 */
const getActiveItems = async (req, res) => {
    try {
        const users = await userService.getAllActiveUsers();
        const response = responseHandler.success('Active users retrieved successfully', users);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Get a single active user by ID
 */
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getActiveUserById(id);
        if (!user) {
            const response = responseHandler.notFoundError('User not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('User retrieved successfully', user);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Create a new user
 */
const createItem = async (req, res) => {
    try {
        const { dni, email, password, role, name, address, phone } = req.body;
        const newUser = await userService.createUser({ dni, email, password, role, name, address, phone });
        const response = responseHandler.success('User created successfully', newUser);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Update a user by ID
 */
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await userService.updateUserById(id, updateData);
        if (!updatedUser) {
            const response = responseHandler.notFoundError('User not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('User updated successfully', updatedUser);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Delete a user by ID
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userService.deleteUserById(id);
        if (!deletedUser) {
            const response = responseHandler.notFoundError('User not found or already inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('User deleted successfully', deletedUser);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Activate a user by ID
 */
const activateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedUser = await userService.activateUserById(id);
        if (!activatedUser) {
            const response = responseHandler.notFoundError('User not found or already active');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('User activated successfully', activatedUser);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

module.exports = {
    getItem,
    getItems,
    getActiveItems,
    createItem,
    updateItem,
    deleteItem,
    activateItem,
};

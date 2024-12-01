const responseHandler = require('../helpers/handleResponse');
const waiterService = require('../services/waiter');

const getItems = async (req, res) => {
    try {
        const waiters = await waiterService.getAllWaiters();
        const response = responseHandler.success('Waiters retrieved successfully', waiters);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const getActiveItems = async (req, res) => {
    try {
        const waiters = await waiterService.getAllActiveWaiters();
        const response = responseHandler.success('Active waiters retrieved successfully', waiters);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const waiter = await waiterService.getWaiterById(id);
        if (!waiter) {
            const response = responseHandler.notFoundError('Waiter not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Waiter retrieved successfully', waiter);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const createItem = async (req, res) => {
    try {
        const { dni, name, address, email, phone } = req.body;
        const newWaiter = await waiterService.createWaiter({ dni, name, address, email, phone });
        const response = responseHandler.success('Waiter created successfully', newWaiter);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, email, phone } = req.body;
        const updatedWaiter = await waiterService.updateWaiterById(id, { name, address, email, phone });
        if (!updatedWaiter) {
            const response = responseHandler.notFoundError('Waiter not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Waiter updated successfully', updatedWaiter);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWaiter = await waiterService.deleteWaiterById(id);
        if (!deletedWaiter) {
            const response = responseHandler.notFoundError('Waiter not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Waiter disabled successfully', deletedWaiter);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const activateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedWaiter = await waiterService.activateWaiterById(id);
        if (!activatedWaiter) {
            const response = responseHandler.notFoundError('Waiter not found or active');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Waiter activated successfully', activatedWaiter);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

module.exports = {
    getItems,
    getActiveItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    activateItem
};
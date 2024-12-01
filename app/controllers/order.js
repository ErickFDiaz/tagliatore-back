const responseHandler = require('../helpers/handleResponse');
const orderService = require('../services/order');

//Obtener todas las ordenes
const getItems = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        const response = responseHandler.success('Orders retrieved successfully', orders);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

//Obtener todas las ordenes activas
const getActiveItems = async (req, res) => {
    try {
        const orders = await orderService.getAllActiveOrders();
        const response = responseHandler.success('Active orders retrieved successfully', orders);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

//Obtener una orden por su ID
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(id);
        if (!order) {
            const response = responseHandler.notFoundError('Order not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Order retrieved successfully', order);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

//Crear una orden
const createItem = async (req, res) => {
    try {
        const { table, client, waiter, orderDetails } = req.body;
        const newOrder = await orderService.createOrder({ table, client, waiter, orderDetails });
        const response = responseHandler.success('Order created successfully', newOrder);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

//Actualizar una orden por su ID
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { table, client, waiter, status, orderDetails } = req.body;
        const updatedOrder = await orderService.updateOrderById(id, { table, client, waiter, status, orderDetails });
        if (!updatedOrder) {
            const response = responseHandler.notFoundError('Order not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Order updated successfully', updatedOrder);
        responseHandler.send(res, response);
    }
    catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const updateItemStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await orderService.updateOrderStatusById(id, status);
        if (!updatedOrder) {
            const response = responseHandler.notFoundError('Order not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Order status updated successfully', updatedOrder);
        responseHandler.send(res, response);
    }
    catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await orderService.deleteOrderById(id);
        if (!deletedOrder) {
            const response = responseHandler.notFoundError('Order not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Order deleted successfully', deletedOrder);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const activateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedOrder = await orderService.activateOrderById(id);
        if (!activatedOrder) {
            const response = responseHandler.notFoundError('Order not found or active');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Order activated successfully', activatedOrder);
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
    updateItemStatus,
    deleteItem,
    activateItem
}


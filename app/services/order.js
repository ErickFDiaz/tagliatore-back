const orderModel = require('../models/orders');

// Crear una nueva orden con sus detalles
const createOrder = async (orderData) => {
    try {
        const newOrder = new orderModel(orderData);
        return await newOrder.save();
    } catch (error) {
        throw new Error('Error creating order: ' + error.message);
    }
};

// Obtener todas las órdenes
const getAllOrders = async () => {
    try {
        return await orderModel.find({});
    } catch (error) {
        throw new Error('Error retrieving orders: ' + error.message);
    }
};

// Obtener todas las órdenes activas
const getAllActiveOrders = async () => {
    try {
        return await orderModel.find({ active: true });
    } catch (error) {
        throw new Error('Error retrieving active orders: ' + error.message);
    }
};

// Obtener una orden por su ID
const getOrderById = async (id) => {
    try {
        return await orderModel.findById(id).populate('orderDetails.dish_id');
    } catch (error) {
        throw new Error('Error retrieving order by ID: ' + error.message);
    }
};

// Actualizar una orden por su ID junto con sus detalles
const updateOrderById = async (id, updateData) => {
    try {
        return await orderModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating order: ' + error.message);
    }
};

// Eliminar una orden por su ID (eliminación lógica)
const deleteOrderById = async (id) => {
    try {
        return await orderModel.findByIdAndUpdate(id, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling order: ' + error.message);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getAllActiveOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};

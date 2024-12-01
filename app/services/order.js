const orderModel = require('../models/order');

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
        return await orderModel.find({})
            .populate('table', 'tableNumber name status')
            .populate('client', 'name')
            .populate('waiter', 'name')
            .populate({
                path: 'orderDetails.dish',
                select: 'name price category',
                populate: {
                    path: 'category',
                    select: 'name' // Poblar el nombre de la categoría
                }
            })
            .lean();
    } catch (error) {
        throw new Error('Error retrieving orders: ' + error.message);
    }
};

// Obtener todas las órdenes activas
const getAllActiveOrders = async () => {
    try {
        return await orderModel.find({ active: true })
            .populate('table', 'tableNumber name status')
            .populate('client', 'name')
            .populate('waiter', 'name')
            .populate({
                path: 'orderDetails.dish',
                select: 'name price category',
                populate: {
                    path: 'category',
                    select: 'name' // Poblar el nombre de la categoría
                }
            })
            .lean();
    } catch (error) {
        throw new Error('Error retrieving active orders: ' + error.message);
    }
};

// Obtener una orden por su ID
const getOrderById = async (id) => {
    try {
        return await orderModel.findById(id)
            .populate('table', 'tableNumber name status')
            .populate('client', 'name')
            .populate('waiter', 'name')
            .populate({
                path: 'orderDetails.dish',
                select: 'name price category',
                populate: {
                    path: 'category',
                    select: 'name' // Poblar el nombre de la categoría
                }
            })
            .lean();
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

// Actualizar el estado de una orden por su ID
const updateOrderStatusById = async (id, status) => {
    try {
        return await orderModel.findByIdAndUpdate(id, { status }, { new: true });
    } catch (error) {
        throw new Error('Error updating order status: ' + error.message);
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

const activateOrderById = async (id) => {
    try {
        return await orderModel.findByIdAndUpdate(id, { active: true }, { new: true });
    } catch (error) {
        throw new Error('Error enabling order: ' + error.message);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getAllActiveOrders,
    getOrderById,
    updateOrderById,
    updateOrderStatusById,
    deleteOrderById,
    activateOrderById
};

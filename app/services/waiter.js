const waiterModel = require('../models/waiters');

// Crear un nuevo mesero
const createWaiter = async (waiterData) => {
    try {
        const newWaiter = new waiterModel(waiterData);
        return await newWaiter.save();
    } catch (error) {
        throw new Error('Error creating waiter: ' + error.message);
    }
};

// Obtener todos los meseros
const getAllWaiters = async () => {
    try {
        return await waiterModel.find({});
    } catch (error) {
        throw new Error('Error retrieving waiters: ' + error.message);
    }
};

// Obtener todos los meseros activos
const getAllActiveWaiters = async () => {
    try {
        return await waiterModel.find({ active: true });
    } catch (error) {
        throw new Error('Error retrieving active waiters: ' + error.message);
    }
};

// Obtener un mesero por su ID
const getWaiterById = async (id) => {
    try {
        return await waiterModel.findById(id);
    } catch (error) {
        throw new Error('Error retrieving waiter by ID: ' + error.message);
    }
};

// Actualizar un mesero por su ID
const updateWaiterById = async (id, updateData) => {
    try {
        return await waiterModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating waiter: ' + error.message);
    }
};

// Eliminar un mesero por su ID (eliminación lógica)
const deleteWaiterById = async (id) => {
    try {
        return await waiterModel.findByIdAndUpdate(id, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling waiter: ' + error.message);
    }
};

module.exports = {
    createWaiter,
    getAllWaiters,
    getAllActiveWaiters,
    getWaiterById,
    updateWaiterById,
    deleteWaiterById
};
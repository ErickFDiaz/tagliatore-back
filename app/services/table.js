const tableModel = require('../models/table');

// Crear una nueva mesa
const createTable = async (tableData) => {
    try {
        const newTable = new tableModel(tableData);
        return await newTable.save();
    } catch (error) {
        throw new Error('Error creating table: ' + error.message);
    }
};

// Obtener todas las mesas
const getAllTables = async () => {
    try {
        return await tableModel.find({});
    } catch (error) {
        throw new Error('Error retrieving tables: ' + error.message);
    }
};

// Obtener todas las mesas activas
const getAllActiveTables = async () => {
    try {
        return await tableModel.find({ active: true });
    } catch (error) {
        throw new Error('Error retrieving active tables: ' + error.message);
    }
};

// Obtener una mesa por su ID
const getTableById = async (id) => {
    try {
        return await tableModel.findOne({ _id: id, active: true });
    } catch (error) {
        throw new Error('Error retrieving table by ID: ' + error.message);
    }
};

// Actualizar una mesa por su ID
const updateTableById = async (id, updateData) => {
    try {
        return await tableModel.findOneAndUpdate({ _id: id, active: true }, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating table: ' + error.message);
    }
};

// Eliminar una mesa por su ID (eliminación lógica)
const deleteTableById = async (id) => {
    try {
        return await tableModel.findOneAndUpdate({ _id: id, active: true }, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling table: ' + error.message);
    }
};

const activateTableById = async (id) => {
    try {
        return await tableModel.findOneAndUpdate({ _id: id, active: false }, { active: true }, { new: true });
    } catch (error) {
        throw new Error('Error activating table: ' + error.message);
    }
};

module.exports = {
    createTable,
    getAllTables,
    getAllActiveTables,
    getTableById,
    updateTableById,
    deleteTableById,
    activateTableById
};

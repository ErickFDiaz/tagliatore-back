const clientModel = require('../models/clients');

// Crear un nuevo cliente
const createClient = async (clientData) => {
    try {
        const newClient = new clientModel(clientData);
        return await newClient.save();
    } catch (error) {
        throw new Error('Error creating client: ' + error.message);
    }
};

// Obtener todos los clientes
const getAllClients = async () => {
    try {
        return await clientModel.find({});
    } catch (error) {
        throw new Error('Error retrieving clients: ' + error.message);
    }
};

// Obtener todos los clientes activos
const getAllActiveClients = async () => {
    try {
        return await clientModel.find({ active: true });
    } catch (error) {
        throw new Error('Error retrieving active clients: ' + error.message);
    }
};

// Obtener un cliente por su ID
const getClientById = async (id) => {
    try {
        return await clientModel.findById(id);
    } catch (error) {
        throw new Error('Error retrieving client by ID: ' + error.message);
    }
};

// Actualizar un cliente por su ID
const updateClientById = async (id, updateData) => {
    try {
        return await clientModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating client: ' + error.message);
    }
};

// Eliminar un cliente por su ID (eliminación lógica)
const deleteClientById = async (id) => {
    try {
        return await clientModel.findByIdAndUpdate(id, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling client: ' + error.message);
    }
};

module.exports = {
    createClient,
    getAllClients,
    getAllActiveClients,
    getClientById,
    updateClientById,
    deleteClientById
};
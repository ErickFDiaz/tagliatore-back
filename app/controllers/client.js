const responseHandler = require('../helpers/handleResponse');
const clientService = require('../services/client');

const getItems = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        const response = responseHandler.success('Clients retrieved successfully', clients);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const getActiveItems = async (req, res) => {
    try {
        const clients = await clientService.getAllActiveClients();
        const response = responseHandler.success('Active clients retrieved successfully', clients);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await clientService.getClientById(id);
        if (!client) {
            const response = responseHandler.notFoundError('Client not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Client retrieved successfully', client);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const createItem = async (req, res) => {
    try {
        const { dni, name, address, email, phone } = req.body;
        const newClient = await clientService.createClient({ dni, name, address, email, phone });
        const response = responseHandler.success('Client created successfully', newClient);
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
        const updatedClient = await clientService.updateClientById(id, { name, address, email, phone });
        if (!updatedClient) {
            const response = responseHandler.notFoundError('Client not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Client updated successfully', updatedClient);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await clientService.deleteClientById(id);
        if (!deletedClient) {
            const response = responseHandler.notFoundError('Client not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Client disabled successfully', deletedClient);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const activateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedClient = await clientService.activateClientById(id);
        if (!activatedClient) {
            const response = responseHandler.notFoundError('Client not found or active');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Client activated successfully', activatedClient);
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
    activateItem,
};
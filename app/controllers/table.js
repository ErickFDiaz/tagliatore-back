const tableService = require('../services/table');
const responseHandler = require('../helpers/handleResponse');

/**
 * Get all tables
 */
const getItems = async (req, res) => {
    try {
        const tables = await tableService.getAllTables();
        const response = responseHandler.success('Tables retrieved successfully', tables);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

/**
 * Get all active tables
 */
const getActiveItems = async (req, res) => {
    try {
        const tables = await tableService.getAllActiveTables();
        const response = responseHandler.success('Active tables retrieved successfully', tables);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

/**
 * Get a single active table by ID
 */
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await tableService.getTableById(id);
        if (!table) {
            const response = responseHandler.notFoundError('Table not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Table retrieved successfully', table);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

/**
 * Create a new table
 */
const createItem = async (req, res) => {
    try {
        const { tableNumber, name, active } = req.body;
        const newTable = await tableService.createTable({ tableNumber,name, active });
        const response = responseHandler.success('Table created successfully', newTable);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Update a table by ID
 */
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, active } = req.body;
        const updatedTable = await tableService.updateTableById(id, { name, active });
        if (!updatedTable) {
            const response = responseHandler.notFoundError('Table not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Table updated successfully', updatedTable);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}; 

/**
 * Delete a table by ID (logical deletion)
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTable = await tableService.deleteTableById(id);
        if (!deletedTable) {
            const response = responseHandler.notFoundError('Table not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Table deleted successfully', deletedTable);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

/**
 * Activate a table by ID
 */
const activateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedTable = await tableService.activateTableById(id);
        if (!activatedTable) {
            const response = responseHandler.notFoundError('Table not found or already active');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Table activated successfully', activatedTable);
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
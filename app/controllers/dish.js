const responseHandler = require('../helpers/handleResponse');
const dishService = require('../services/dish');

const getItems = async (req, res) => {
    try {
        const dishes = await dishService.getAllDishes();
        const response = responseHandler.success('Dishes retrieved successfully', dishes);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const getActiveItems = async (req, res) => {
    try {
        const dishes = await dishService.getAllActiveDishes();
        const response = responseHandler.success('Active dishes retrieved successfully', dishes);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const getItem = async (req, res) => { 
    try {
        const { id } = req.params;
        const dish = await dishService.getDishById(id);
        if (!dish) {
            const response = responseHandler.notFoundError('Dish not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Dish retrieved successfully', dish);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const createItem = async (req, res) => {
    try {
        const { name, price,ingredients, category,image, active } = req.body;
        const newDish = await dishService.createDish({ name, price,ingredients, category,image, active });
        const response = responseHandler.success('Dish created successfully', newDish);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDish = await dishService.updateDishById(id, req.body);
        if (!updatedDish) {
            const response = responseHandler.notFoundError('Dish not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Dish updated successfully', updatedDish);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDish = await dishService.deleteDishById(id);
        if (!deletedDish) {
            const response = responseHandler.notFoundError('Dish not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Dish deleted successfully', deletedDish);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
}

const activateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedDish = await dishService.activateDishById(id);
        if (!activatedDish) {
            const response = responseHandler.notFoundError('Dish not found or already active');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Dish activated successfully', activatedDish);
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
}
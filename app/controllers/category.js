// category_controller.js
const categoryService = require('../services/category');
const responseHandler = require('../helpers/handleResponse');

/**
 * Get all categories
 */
const getItems = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        const response = responseHandler.success('Categories retrieved successfully', categories);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Get all active categories
 */
const getActiveItems = async (req, res) => {
    try {
        const categories = await categoryService.getAllActiveCategories();
        const response = responseHandler.success('Active categories retrieved successfully', categories);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Get a single active category by ID
 */
const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            const response = responseHandler.notFoundError('Category not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Category retrieved successfully', category);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Create a new category
 */
const createItem = async (req, res) => {
    try {
        const { name, active } = req.body;
        const newCategory = await categoryService.createCategory({ name, active });
        const response = responseHandler.success('Category created successfully', newCategory);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Update a category by ID
 */
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedCategory = await categoryService.updateCategoryById(id, updateData);
        if (!updatedCategory) {
            const response = responseHandler.notFoundError('Category not found or inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Category updated successfully', updatedCategory);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Delete a category by ID (logical deletion)
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoryService.deleteCategoryById(id);
        if (!deletedCategory) {
            const response = responseHandler.notFoundError('Category not found or already inactive');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Category deleted successfully', deletedCategory);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

/**
 * Activate a category by ID
 */
const activateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const activatedCategory = await categoryService.activateCategoryById(id);
        if (!activatedCategory) {
            const response = responseHandler.notFoundError('Category not found or already active');
            return responseHandler.send(res, response);
        }
        const response = responseHandler.success('Category activated successfully', activatedCategory);
        responseHandler.send(res, response);
    } catch (e) {
        const response = responseHandler.internalServerError(e.message);
        responseHandler.send(res, response);
    }
};

module.exports = {
    getItems,
    getActiveItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    activateItem
};
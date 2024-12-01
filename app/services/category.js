const categoryModel = require('../models/category');

// Crear una nueva categoría
const createCategory = async (categoryData) => {
    try {
        const newCategory = new categoryModel(categoryData);
        return await newCategory.save();
    } catch (error) {
        throw new Error('Error creating category: ' + error.message);
    }
};

// Obtener todas las categorías
const getAllCategories = async () => {
    try {
        return await categoryModel.find({});
    } catch (error) {
        throw new Error('Error retrieving categories: ' + error.message);
    }
};

const getAllActiveCategories = async () => {
    try {
        return await categoryModel.find({ active: true });
    } catch (error) {
        throw new Error('Error retrieving categories: ' + error.message);
    }
};

// Obtener una categoría activa por su ID
const getCategoryById = async (id) => {
    try {
        return await categoryModel.findOne({ _id: id, active: true });
    } catch (error) {
        throw new Error('Error retrieving active category by ID: ' + error.message);
    }
};

// Actualizar una categoría por su ID (Solo si está activa)
const updateCategoryById = async (id, updateData) => {
    try {
        return await categoryModel.findOneAndUpdate({ _id: id, active: true }, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};

// Eliminar una categoría por su ID (eliminación lógica)
const deleteCategoryById = async (id) => {
    try {
        return await categoryModel.findOneAndUpdate({ _id: id, active: true }, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling category: ' + error.message);
    }
};

// Activar una categoría por su ID
const activateCategoryById = async (id) => {
    try {
        return await categoryModel.findOneAndUpdate({ _id: id, active: false }, { active: true }, { new: true });
    } catch (error) {
        throw new Error('Error enabling category: ' + error.message);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getAllActiveCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
    activateCategoryById
};

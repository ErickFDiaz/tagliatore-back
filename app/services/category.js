const categoryModel = require('../models/categories');

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

// Obtener una categoría por su ID
const getCategoryById = async (id) => {
    try {
        return await categoryModel.findById(id);
    } catch (error) {
        throw new Error('Error retrieving category by ID: ' + error.message);
    }
};

// Actualizar una categoría por su ID
const updateCategoryById = async (id, updateData) => {
    try {
        return await categoryModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating category: ' + error.message);
    }
};

// Eliminar una categoría por su ID (eliminación lógica)
const deleteCategoryById = async (id) => {
    try {
        return await categoryModel.findByIdAndUpdate(id, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling category: ' + error.message);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getAllActiveCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};

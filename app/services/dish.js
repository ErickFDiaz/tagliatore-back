const dishModel = require('../models/dish');

// Crear un nuevo plato
const createDish = async (dishData) => {
    try {
        const newDish = new dishModel(dishData);
        return await newDish.save();
    } catch (error) {
        throw new Error('Error creating dish: ' + error.message);
    }
};

// Obtener todos los platos
const getAllDishes = async () => {
    try {
        return await dishModel.find({}).populate('category', 'name').lean();
    } catch (error) {
        throw new Error('Error retrieving dishes: ' + error.message);
    }
};

const getAllActiveDishes = async () => {
    try {
        return await dishModel.find({ active: true }).populate('category', 'name').lean();
    } catch (error) {
        throw new Error('Error retrieving dishes: ' + error.message);
    }
};

// Obtener un plato activo por su ID
const getDishById = async (id) => {
    try {
        return await dishModel.findOne({ _id: id, active: true }).populate('category', 'name').lean();
    } catch (error) {
        throw new Error('Error retrieving active dish by ID: ' + error.message);
    }
};

// Actualizar un plato por su ID (Solo si está activo)
const updateDishById = async (id, updateData) => {
    try {
        return await dishModel.findOneAndUpdate({ _id: id, active: true }, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating dish: ' + error.message);
    }
};

// Eliminar un plato por su ID (eliminación lógica)
const deleteDishById = async (id) => {
    try {
        return await dishModel.findOneAndUpdate({ _id: id, active: true }, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling dish: ' + error.message);
    }
};

// Activar un plato por su ID
const activateDishById = async (id) => {
    try {
        return await dishModel.findOneAndUpdate({ _id: id, active: false }, { active: true }, { new: true });
    } catch (error) {
        throw new Error('Error enabling dish: ' + error.message);
    }
};

module.exports = {
    createDish,
    getAllDishes,
    getAllActiveDishes,
    getDishById,
    updateDishById,
    deleteDishById,
    activateDishById
};

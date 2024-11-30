const dishModel = require('../models/dishes');

// Crear un nuevo platillo
const createDish = async (dishData) => {
    try {
        const newDish = new dishModel(dishData);
        return await newDish.save();
    } catch (error) {
        throw new Error('Error creating dish: ' + error.message);
    }
};

// Obtener todos los platillos
const getAllDishes = async () => {
    try {
        return await dishModel.find({});
    } catch (error) {
        throw new Error('Error retrieving dishes: ' + error.message);
    }
};

// Obtener todos los platillos activos
const getAllActiveDishes = async () => {
    try {
        return await dishModel.find({ active: true });
    } catch (error) {
        throw new Error('Error retrieving active dishes: ' + error.message);
    }
};

// Obtener un platillo por su ID
const getDishById = async (id) => {
    try {
        return await dishModel.findById(id);
    } catch (error) {
        throw new Error('Error retrieving dish by ID: ' + error.message);
    }
};

// Actualizar un platillo por su ID
const updateDishById = async (id, updateData) => {
    try {
        return await dishModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating dish: ' + error.message);
    }
};

// Eliminar un platillo por su ID (eliminación lógica)
const deleteDishById = async (id) => {
    try {
        return await dishModel.findByIdAndUpdate(id, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling dish: ' + error.message);
    }
};

module.exports = {
    createDish,
    getAllDishes,
    getAllActiveDishes,
    getDishById,
    updateDishById,
    deleteDishById
};

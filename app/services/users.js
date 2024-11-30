const userModel = require('../models/users');

// Crear un nuevo usuario
const createUser = async (userData) => {
    try {
        const newUser = new userModel(userData);
        return await newUser.save();
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

// Obtener todos los usuarios
const getAllUsers = async () => {
    try {
        return await userModel.find({});
    } catch (error) {
        throw new Error('Error retrieving users: ' + error.message);
    }
};

// Obtener todos los usuarios activos
const getAllActiveUsers = async () => {
    try {
        return await userModel.find({ active: true });
    } catch (error) {
        throw new Error('Error retrieving active users: ' + error.message);
    }
};

// Obtener un usuario por su ID
const getUserById = async (id) => {
    try {
        return await userModel.findById(id);
    } catch (error) {
        throw new Error('Error retrieving user by ID: ' + error.message);
    }
};

// Actualizar un usuario por su ID
const updateUserById = async (id, updateData) => {
    try {
        return await userModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Eliminar un usuario por su ID (eliminación lógica)
const deleteUserById = async (id) => {
    try {
        return await userModel.findByIdAndUpdate(id, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling user: ' + error.message);
    }
};

// Obtener un usuario por correo electrónico
const getUserByEmail = async (email) => {
    try {
        return await userModel.findOne({ email });
    } catch (error) {
        throw new Error('Error retrieving user by email: ' + error.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getAllActiveUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserByEmail
};

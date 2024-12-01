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

// Obtener un usuario activo por su ID
const getActiveUserById = async (id) => {
    try {
        return await userModel.findOne({ _id: id, active: true });
    } catch (error) {
        throw new Error('Error retrieving active user by ID: ' + error.message);
    }
};

// Actualizar un usuario por su ID (solo si está activo)
const updateUserById = async (id, updateData) => {
    try {
        return await userModel.findOneAndUpdate({ _id: id, active: true }, updateData, { new: true });
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Eliminar un usuario por su ID (eliminación lógica)
const deleteUserById = async (id) => {
    try {
        return await userModel.findOneAndUpdate({ _id: id, active: true }, { active: false }, { new: true });
    } catch (error) {
        throw new Error('Error disabling user: ' + error.message);
    }
};

// Activar un usuario por su ID
const activateUserById = async (id) => {
    try {
        return await userModel.findOneAndUpdate({ _id: id, active: false }, { active: true }, { new: true });
    } catch (error) {
        throw new Error('Error activating user: ' + error.message);
    }
};

// Obtener un usuario por correo electrónico (solo si está activo)
const getUserByEmail = async (email) => {
    try {
        return await userModel.findOne({ email, active: true });
    } catch (error) {
        throw new Error('Error retrieving user by email: ' + error.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getAllActiveUsers,
    getActiveUserById,
    updateUserById,
    deleteUserById,
    activateUserById,
    getUserByEmail
};

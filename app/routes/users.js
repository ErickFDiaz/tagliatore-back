const express = require('express')
const router = express.Router()
// const checkOrigin = require('../middleware/origin')
// const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, getActiveItems, getItem, deleteItem, updateItem, createItem, activateItem } = require('../controllers/users');
//const { validateCreateUser } = require('../validators/users')

// //TODO: Turbo 🐱‍🏍  cache!
// router.get(
//     '/',
//     checkOrigin,
//     cacheInit, //
//     getItems
// )

// Obtener todos los usuarios
router.get('/', checkRoleAuth(['user','admin']), getItems);

// Obtener todos los usuarios activos
router.get('/active', checkRoleAuth(['user','admin']), getActiveItems);

// Obtener un usuario activo por su ID
router.get('/:id', checkRoleAuth(['user','admin']), getItem);

// Crear un nuevo usuario
// router.post('/', checkOrigin, validateCreateUser, createItem);
router.post('/', checkRoleAuth(['user','admin']), createItem);

// Actualizar un usuario por su ID
router.put('/:id', checkRoleAuth(['user','admin']), updateItem);

// Eliminar (desactivar) un usuario por su ID
router.delete('/:id', checkRoleAuth(['user','admin']), deleteItem);

// Activar un usuario por su ID
router.patch('/:id/activate', checkRoleAuth(['user','admin']), activateItem);


module.exports = router
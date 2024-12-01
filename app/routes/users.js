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
router.get('/', checkRoleAuth(['admin']), getItems);

// Obtener todos los usuarios activos
router.get('/active', checkRoleAuth(['admin']), getActiveItems);

// Obtener un usuario activo por su ID
router.get('/:id', checkRoleAuth(['admin']), getItem);

// Crear un nuevo usuario
// router.post('/', checkOrigin, validateCreateUser, createItem);
router.post('/', checkRoleAuth(['admin']), createItem);

// Actualizar un usuario por su ID
router.put('/:id', checkRoleAuth(['admin']), updateItem);

// Eliminar (desactivar) un usuario por su ID
router.delete('/:id', checkRoleAuth(['admin']), deleteItem);

// Activar un usuario por su ID
router.patch('/:id/activate', checkRoleAuth(['admin']), activateItem);


module.exports = router
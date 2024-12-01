const express = require('express');
const router = express.Router();
const checkRoleAuth = require('../middleware/roleAuth');
const { getItems, getActiveItems, getItem, createItem, updateItem, deleteItem, activateItem } = require('../controllers/table');

// Obtener todas las mesas
router.get('/', checkRoleAuth(['admin']), getItems);

// Obtener todas las mesas activas
router.get('/active', checkRoleAuth(['admin']), getActiveItems);

// Obtener una mesa por su ID
router.get('/:id', checkRoleAuth(['admin']), getItem);

// Crear una nueva mesa
router.post('/', checkRoleAuth(['admin']), createItem);

// Actualizar una mesa por su ID
router.put('/:id', checkRoleAuth(['admin']), updateItem);

// Eliminar (desactivar) una mesa por su ID
router.delete('/:id', checkRoleAuth(['admin']), deleteItem);

// Activar una mesa por su ID
router.patch('/:id/activate', checkRoleAuth(['admin']), activateItem);

module.exports = router;
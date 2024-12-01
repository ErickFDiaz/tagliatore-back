const express = require('express');
const router = express.Router();
const checkRoleAuth = require('../middleware/roleAuth');
const { getItems, getActiveItems, getItem, createItem, updateItem, deleteItem, activateItem } = require('../controllers/category');

// Obtener todas las categorías
router.get('/', checkRoleAuth(['admin']), getItems);

// Obtener todas las categorías activas
router.get('/active', checkRoleAuth(['admin']), getActiveItems);

// Obtener una categoría por su ID
router.get('/:id', checkRoleAuth(['admin']), getItem);

// Crear una nueva categoría
router.post('/', checkRoleAuth(['admin']), createItem);

// Actualizar una categoría por su ID
router.patch('/:id', checkRoleAuth(['admin']), updateItem);

// Eliminar (desactivar) una categoría por su ID
router.delete('/:id', checkRoleAuth(['admin']), deleteItem);

// Activar una categoría por su ID
router.patch('/:id/activate', checkRoleAuth(['admin']), activateItem);

module.exports = router;
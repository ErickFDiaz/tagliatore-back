const express = require('express');
const router = express.Router();
const checkRoleAuth = require('../middleware/roleAuth');
const { getItems, getActiveItems, getItem, createItem, updateItem, deleteItem, activateItem } = require('../controllers/category');

// Obtener todas las categorías
router.get('/', checkRoleAuth(['user','admin']), getItems);

// Obtener todas las categorías activas
router.get('/active', checkRoleAuth(['user','admin']), getActiveItems);

// Obtener una categoría por su ID
router.get('/:id', checkRoleAuth(['user','admin']), getItem);

// Crear una nueva categoría
router.post('/', checkRoleAuth(['user','admin']), createItem);

// Actualizar una categoría por su ID
router.put('/:id', checkRoleAuth(['user','admin']), updateItem);

// Eliminar (desactivar) una categoría por su ID
router.delete('/:id', checkRoleAuth(['user','admin']), deleteItem);

// Activar una categoría por su ID
router.patch('/:id/activate', checkRoleAuth(['user','admin']), activateItem);

module.exports = router;
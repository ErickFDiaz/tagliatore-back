const express = require('express');
const router = express.Router();
const checkRoleAuth = require('../middleware/roleAuth');
const { getItems, getActiveItems, getItem, createItem, updateItem, deleteItem, activateItem, updateItemStatus } = require('../controllers/order');

router.get('/', checkRoleAuth(['user','admin']), getItems);
router.get('/active', checkRoleAuth(['user','admin']), getActiveItems);
router.get('/:id', checkRoleAuth(['user','admin']), getItem);
router.post('/', checkRoleAuth(['user','admin']), createItem);
router.put('/:id', checkRoleAuth(['user','admin']), updateItem);
router.delete('/:id', checkRoleAuth(['user','admin']), deleteItem);
router.patch('/:id/activate', checkRoleAuth(['user','admin']), activateItem);

// Actualizar el estado de una orden por su ID
router.patch('/:id/status', checkRoleAuth(['user','admin']), updateItemStatus);

module.exports = router;
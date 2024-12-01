const express = require('express');
const router = express.Router();
const checkRoleAuth = require('../middleware/roleAuth');
const { getItems, getActiveItems, getItem, createItem, updateItem, deleteItem, activateItem } = require('../controllers/waiter');

router.get('/', checkRoleAuth(['admin']), getItems);
router.get('/active', checkRoleAuth(['admin']), getActiveItems);
router.get('/:id', checkRoleAuth(['admin']), getItem);
router.post('/', checkRoleAuth(['admin']), createItem);
router.put('/:id', checkRoleAuth(['admin']), updateItem);
router.delete('/:id', checkRoleAuth(['admin']), deleteItem);
router.patch('/:id/activate', checkRoleAuth(['admin']), activateItem);

module.exports = router;
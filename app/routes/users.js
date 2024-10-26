const express = require('express')
const router = express.Router()
// const checkOrigin = require('../middleware/origin')
// const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const { getItems, getItem, deleteItem, updateItem } = require('../controllers/users')
//const { validateCreateUser } = require('../validators/users')

// //TODO: Turbo 🐱‍🏍  cache!
// router.get(
//     '/',
//     checkOrigin,
//     cacheInit, //
//     getItems
// )

router.get('/', checkRoleAuth(['admin']), getItems)

router.get('/:id', checkRoleAuth(['admin']), getItem)

//TODO: Donde recibimos data
// router.post('/', checkOrigin, validateCreateUser, createItem)

router.patch('/:id', checkRoleAuth(['admin']), updateItem)

router.delete('/:id', checkRoleAuth(['admin']), deleteItem)


module.exports = router
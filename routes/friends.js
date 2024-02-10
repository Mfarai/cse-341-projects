const express = require('express')
const router = express.Router()

const userController = require('../controllers/friends');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle)

router.post('/', isAuthenticated, userController.createFriend)

router.put('/:id', isAuthenticated, userController.updateFriend)

router.delete('/:id', isAuthenticated, userController.deleteFriend)

module.exports = router
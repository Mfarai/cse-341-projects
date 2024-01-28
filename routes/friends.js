const express = require('express')
const router = express.Router()

const userController = require('../controllers/friends')

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle)

router.post('/',userController.createFriend)

router.put('/:id',userController.updateFriend)

router.delete('/:id',userController.deleteFriend)

module.exports = router
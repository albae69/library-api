const express = require('express')
const router = express.Router()

const {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controller/user.controller')

// GET - ALl User
router.get('/', getUser)

// GET - User by id
router.get('/:id', getUserById)

// PUT - Update User
router.put('/:id', updateUser)

// DELETE - User
router.delete('/:id', deleteUser)

module.exports = router

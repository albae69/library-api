import express from 'express'
const router = express.Router()

import {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js'

// GET - ALl User
router.get('/', getUser)

// GET - User by id
router.get('/:id', getUserById)

// PUT - Update User
router.put('/:id', updateUser)

// DELETE - User
router.delete('/:id', deleteUser)

export default router

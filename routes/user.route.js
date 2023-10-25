import express from 'express'
const router = express.Router()

import {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controller/user.controller.js'
import { verifToken } from '../middleware/auth.js'

router.use(verifToken)

// GET - ALl User
router.get('/', getUser)

// GET - User by id
router.get('/:id', getUserById)

// PUT - Update User
router.post('/:id/update', updateUser)

// DELETE - User
router.post('/:id/delete', deleteUser)

export default router

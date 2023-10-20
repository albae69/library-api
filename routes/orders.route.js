import express from 'express'
const router = express.Router()

import { verifToken } from '../middleware/auth.js'
import {
  getOrders,
  createOrder,
  getOrderById,
} from '../controller/orders.controller.js'

router.use(verifToken)

// GET - ALl Orders
router.get('/', getOrders)

// GET - Order By Id
router.get('/:id', getOrderById)

// POST - Create Order
router.post('/', createOrder)

export default router

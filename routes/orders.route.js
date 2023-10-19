import express from 'express'
const router = express.Router()

import { verifToken } from '../middleware/auth.js'
import { getOrders, createOrder } from '../controller/orders.controller.js'

router.use(verifToken)

// GET - ALl Orders
router.get('/', getOrders)

// POST - Create Order
router.post('/', createOrder)

export default router

import express from 'express'
const router = express.Router()

import { verifToken } from '../middleware/auth.js'
import { createOrderItem } from '../controller/order_item.controller.js'

router.use(verifToken)

// POST - Create Order Item
router.post('/', createOrderItem)

export default router

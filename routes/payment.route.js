import express from 'express'
const router = express.Router()

import { verifToken } from '../middleware/auth.js'
import { createPayment } from '../controller/payment.controller.js'

router.use(verifToken)

// POST - Create Payment
router.post('/', createPayment)

export default router

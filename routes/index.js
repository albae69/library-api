import express from 'express'

import book from './book.route.js'
import user from './user.route.js'
import auth from './auth.route.js'
import orders from './orders.route.js'
import order_item from './order_item.route.js'
import payment from './payment.route.js'

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/books', book)
router.use('/orders', orders)
router.use('/order_item', order_item)
router.use('/payment', payment)

export default router

import supabase from '../config/supabase.js'

// create payment
const createPayment = async (req, res) => {
  // #swagger.tags = ['Payment']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/createPayment' }
    } */

  try {
    const user = req.decoded
    console.log('user', user)

    const { order_id, total_price } = req.body

    // check if user has enough balance
    if (user.balance < total_price) {
      res.json({
        success: false,
        message: 'User has insufficient balance',
      })
      return
    }

    const { data: payment, error } = await supabase
      .from('payment')
      .insert([{ order_id, payment_amount: total_price }])
      .select()
      .single()

    if (error) {
      res.send(500).send(error)
      return
    }

    // - update user balance after making payment
    const { data: users } = await supabase
      .from('users')
      .update({ balance: user?.balance - total_price })
      .eq('id', user?.id)
      .select()
    console.log('users', users)

    // - update book stock
    const { data: books } = await supabase.from('books').select()
    const { data: order_items } = await supabase
      .from('order_items')
      .select()
      .eq('order_id', order_id)

    const updateStock = (bookId, quantity) => {
      const book = books.find((b) => b.id == bookId)
      if (book) {
        book.stock -= quantity
      }
    }

    order_items.forEach((order) => updateStock(order.book_id, order.quantity))

    const { data: bookUpdated } = await supabase
      .from('books')
      .upsert(books)
      .select()

    console.log('bookUpdated', bookUpdated)
    res.json({
      success: true,
      message: 'Succes create a payment order',
      data: payment,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

export { createPayment }

import supabase from '../config/supabase.js'

// create order item
const createOrderItem = async (req, res) => {
  // #swagger.tags = ['Order Item']

  try {
    const { order_id, book_id, quantity, price } = req.body

    // insert order item
    const { data, error } = await supabase
      .from('order_items')
      .insert([{ order_id, book_id, quantity, price }])
      .select()

    // select order
    const order = await supabase
      .from('orders')
      .select()
      .eq('id', order_id)
      .single()

    console.log('current order', order)

    // update order
    const updatedOrder = await supabase
      .from('orders')
      .update({ total_price: order.data.total_price + quantity * price })
      .eq('id', order_id)
      .select()
      .single()

    console.log('updatedOrder', updatedOrder)

    if (error) {
      console.log('error', error)
      res.status(500).send(error)
    }

    res.json({
      success: true,
      message: 'Succesfully create a order item',
      data: data,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export { createOrderItem }

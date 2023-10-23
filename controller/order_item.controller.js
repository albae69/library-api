import supabase from '../config/supabase.js'

// create order item
const createOrderItem = async (req, res) => {
  // #swagger.tags = ['Order Item']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/createOrderItem' }
    } */

  try {
    const { order_items } = req.body

    let totalPrice = 0
    let order_id = null

    for (let i = 0; i < order_items.length; i++) {
      order_id = order_items[i].order_id
      totalPrice += order_items[i].price * order_items[i].quantity
    }

    // insert order item
    const { data, error } = await supabase
      .from('order_items')
      .insert(order_items)
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
      .update({ total_price: order.data.total_price + totalPrice })
      .eq('id', order_id)
      .select()
      .single()

    console.log('updatedOrder', updatedOrder)

    if (error) {
      console.log('error while create order item', error)
      res.status(500).send(error)
    }

    res.json({
      success: true,
      message: 'Succesfully create a order item',
      data: data,
    })
  } catch (error) {
    console.log('error while create order item', error)
    res.status(500).send(error)
  }
}

export { createOrderItem }

import supabase from '../config/supabase.js'

// get all order
const getOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`*,users (id,name,email,isAdmin),order_items (*)`)
    console.log('data getOrders', data)
    if (error) {
      res.status(500).send(error)
      return
    }

    res.json({
      message: 'Success get all order',
      data: data,
    })
  } catch (error) {
    throw new Error(error)
  }
}

const createOrder = async (req, res) => {
  try {
    const { total_price } = req.body
    const user = req.decoded
    console.log('user', user)

    const { data, error } = await supabase
      .from('orders')
      .insert([{ customer_id: user.id, total_price }])
      .select()

    if (error) {
      res.status(500).send(error)
      return
    }

    res.json({
      message: 'Success create an order',
      data: data,
    })
  } catch (error) {
    throw new Error(error)
  }
}

export { getOrders, createOrder }

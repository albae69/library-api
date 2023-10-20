import supabase from '../config/supabase.js'

// get all order
const getOrders = async (req, res) => {
  // #swagger.tags = ['Order']

  try {
    const user = req.decoded

    let query = supabase
      .from('orders')
      .select(`*,users (id,name,email,isAdmin),order_items (*)`)

    if (!user.isAdmin) {
      // if user not an admin, get order by user id
      query = query.eq('customer_id', user.id)
    }

    const { data: orders, error } = await query

    if (error) {
      res.status(500).send(error)
      return
    }

    res.json({
      message: 'Success get all order',
      data: orders,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

// get order by id
const getOrderById = async (req, res) => {
  // #swagger.tags = ['Order']
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('orders')
      .select(`*,users (id,name,email,isAdmin),order_items (*,books (*))`)
      .eq('id', id)
      .single()

    if (error) {
      res.status(500).send(error)
      return
    }

    res.json({
      message: 'Success get an order',
      data: data,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

const createOrder = async (req, res) => {
  // #swagger.tags = ['Order']

  try {
    const { total_price } = req.body
    const user = req.decoded
    console.log('user', user)

    const { data, error } = await supabase
      .from('orders')
      .insert([{ customer_id: user.id, total_price: total_price || 0 }])
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
    res.status(500).send(error)
  }
}

export { getOrders, createOrder, getOrderById }

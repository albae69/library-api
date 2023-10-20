import supabase from '../config/supabase.js'
import bcrypt from 'bcryptjs'

// get User
const getUser = async (req, res) => {
  // #swagger.tags = ['User']

  try {
    const decode = req.decoded
    console.log('decode', decode)

    let query = supabase.from('users').select('id,name,email,balance,isAdmin')

    if (!decode?.isAdmin) {
      query = query.eq('id', decode.id)
    }

    const { data, error } = await query

    if (error) {
      res.json({
        success: false,
        message: 'Failed to get user',
      })
      return
    }

    res.json({
      success: true,
      message: 'Successfuly get all user',
      data: data,
    })
  } catch (error) {
    logger.error(error)
    res.status(500).send({
      success: false,
      message: error?.message,
    })
  }
}

// get User by id
const getUserById = async (req, res) => {
  // #swagger.tags = ['User']

  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('users')
      .select('id,name,email,isAdmin')
      .eq('id', id)
      .single()

    if (error) {
      res.status(500).send(error)

      return
    }

    res.send({
      success: true,
      message: 'Successfuly get user detail',
      data: data,
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

// update User
const updateUser = async (req, res) => {
  // #swagger.tags = ['User']

  try {
    const { id } = req.params
    const { name, email, password, isAdmin } = req.body

    const user = await supabase.from('users').select().eq('id', id)
    let currentUser = user.data[0]
    console.log('currentUser', currentUser)

    // hash password
    const hashPassword = await bcrypt.hash(password, 10)

    let updatedUser = {
      name: name || currentUser.name,
      email: email || currentUser.email,
      password: hashPassword || (await bcrypt.hash(currentUser.password, 10)),
      isAdmin: isAdmin || currentUser.isAdmin,
    }

    res.json({
      success: true,
      message: 'Successfully Updated user',
      data: updatedUser,
    })
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    })
  }
}

// remove User
const deleteUser = async (req, res) => {
  // #swagger.tags = ['User']

  try {
    const { id } = req.params
    const { error } = await supabase.from('users').delete().eq('id', id)
    res.json({
      success: true,
      message: 'Succes remove user',
    })
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    })
  }
}

export { getUser, getUserById, updateUser, deleteUser }

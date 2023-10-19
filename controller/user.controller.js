import supabase from '../config/supabase.js'
import bcrypt from 'bcryptjs'

// get User
const getUser = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
      res.json({
        success: false,
        message: 'Failed to get user',
      })
      return false
    }

    res.json({
      success: true,
      message: 'Successfuly get all user',
      data: data,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    })
  }
}

// get User by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase.from('users').select().eq('id', id)
    if (error) {
      res.json({
        success: false,
        message: 'Failed to get user',
      })
      return false
    }

    res.json({
      success: true,
      message: 'Successfuly get user detail',
      data: data,
    })
  } catch (error) {
    res.json({
      success: false,
      message: error,
    })
  }
}

// update User
const updateUser = async (req, res) => {
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

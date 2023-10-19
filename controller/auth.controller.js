import supabase from '../config/supabase.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
  // #swagger.tags = ['Auth']
  try {
    const { email, password } = req.body

    // validate user input
    if (!email && !password) {
      res.status(400).send({
        success: false,
        message: 'Email or Password should not be empty',
      })
    }

    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)

    if (error) {
      console.log('error', error)
    }

    if (data.length > 0) {
      let user = data[0]
      const hashPassword = await bcrypt.compare(password, user.password)
      if (hashPassword) {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: '2h',
        })

        // remove from response
        delete user['password']

        res.json({
          success: true,
          message: 'Success login',
          data: { ...user, token: token },
        })
      } else {
        res.json({
          success: false,
          message: 'email or password is wrong!',
        })
      }
    } else {
      res.status(404).send({
        success: false,
        message: 'User not found!',
      })
    }
  } catch (error) {
    console.log('error', error)
  }
}

const register = async (req, res) => {
  // #swagger.tags = ['Auth']

  try {
    // get user input
    const { name, email, password, isAdmin } = req.body

    // validate user input
    if (!name && !email && !password) {
      res.status(400).send('Please fill all the required fields')
    }

    // check if user exists
    const user = await supabase.from('users').select('email')
    const isExists = user.data.filter((item) => item.email == email)
    if (isExists.length > 0) {
      res.json({
        success: false,
        message: 'User already exists!',
      })
      return false
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10)

    // create new user
    const { data, error } = await supabase
      .from('users')
      .insert([
        { name, email, password: hashPassword, isAdmin: isAdmin || false },
      ])
      .select('id,name,email,isAdmin')

    if (error) {
      res.status(500).send({
        success: false,
        message: error?.message,
      })
      return false
    }

    res.status(201).send({
      success: true,
      message: 'Succesfully create an user',
      data: data,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message,
    })
  }
}

export { login, register }

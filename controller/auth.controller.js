import supabase from '../config/supabase.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    // validate user input
    if (!email && !password) {
      res.status(400).send('Please fill all the required fields')
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
    let user = data[0]
    const hashPassword = await bcrypt.compare(password, user.password)
    if (hashPassword) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      )

      //save user token
      user.token = token

      res.status(200).send({
        success: true,
        message: 'Success login',
        data: user,
      })
    } else {
      res.send({
        success: false,
        message: 'email or password is wrong!',
      })
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    })
  }
}

const register = async (req, res) => {
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
      .select()

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
      message: error,
    })
  }
}

export { login, register }

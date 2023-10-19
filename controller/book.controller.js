import supabase from '../config/supabase.js'

// get all books
const getBooks = async (req, res) => {
  try {
    const { data, error } = await supabase.from('books').select()
    if (error) {
      console.log('error while getBooks', error)
      res.send(error)
    }
    res.json({
      success: true,
      message: 'Succes get all books',
      data: data,
    })
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    })
    throw new Error(error)
  }
}

// get book by id
const getBookById = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('books')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      console.log('error while getBooks', error)
      res.json({
        success: false,
        message: 'Book not found',
      })
      return
    }
    res.json({
      success: true,
      message: 'Succes get a book',
      data: data,
    })
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    })
    throw new Error(error)
  }
}

// remove book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params
    const { error } = await supabase.from('books').delete().eq('id', id)
    res.json({
      success: true,
      message: 'Succes remove book',
    })
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    })
  }
}

// create a book
const createBook = async (req, res) => {
  try {
    const { title, author, price, stock } = req.body

    const { data, error } = await supabase
      .from('books')
      .insert([{ title, author, price, stock }])
      .select()

    if (error) {
      res.send(error)
      return
    }

    res.json({
      success: true,
      message: 'Succesfully create book',
      data: data,
    })
  } catch (error) {
    console.log('error while create book', error)
    res.status(500).send({
      success: false,
      message: error?.message,
    })
  }
}

export { getBooks, getBookById, deleteBook, createBook }

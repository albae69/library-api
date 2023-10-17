const supabase = require('../config/supabase')

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

module.exports = { getBooks, deleteBook }

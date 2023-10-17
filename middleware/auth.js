const jwt = require('jsonwebtoken')

const verifToken = (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided',
      })
    }
    return next()
  } catch (error) {
    return res.status(401).send('Invalid Token')
  }
}

module.exports = verifToken

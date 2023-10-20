import jwt, { decode } from 'jsonwebtoken'

const verifToken = (req, res, next) => {
  try {
    /* #swagger.security = [{
                "Bearer": []
        }] */
    let bearer = req.headers['authorization']
    let token = bearer.split(' ')[1] || bearer

    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided',
      })
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.send({
            success: false,
            message: err.message,
          })
          return
        }
        req.decoded = decode
        next()
      })
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized',
    })
  }
}

export { verifToken }

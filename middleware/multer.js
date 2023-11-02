import multer from 'multer'
import { uploadCloudinary } from './cloudinary.js'

const storage = multer.memoryStorage()
const upload = multer({ storage })
const uploadMiddleware = upload.single('file')

const runMiddleware = (req, res, cb) =>
  new Promise((resolve, reject) => {
    cb(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })

const uploadFile = async (req, res, next) => {
  const MAX_FILE_SIZE = 3000000 //3mb
  try {
    await runMiddleware(req, res, uploadMiddleware)

    const decode = req.decoded
    if (!decode?.isAdmin) {
      res.send({
        success: false,
        message: 'Only admin can create a book',
      })
      return
    }

    if (req.file.size >= MAX_FILE_SIZE) {
      res.json({
        success: false,
        message: 'image too large, should be less than 3mb',
      })
    }
    const b64 = Buffer.from(req.file.buffer).toString('base64')
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64
    const cldRes = await uploadCloudinary(dataURI)
    req.imageUrl = cldRes.secure_url
    next()
  } catch (error) {
    console.error('error while upload file', error)
    res.send({
      success: false,
    })
  }
}

export { uploadFile }

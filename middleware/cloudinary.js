import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const uploadCloudinary = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
      folder: 'library',
    })
    return res
  } catch (error) {
    console.log('error while upload', error)
  }
}

export { uploadCloudinary }

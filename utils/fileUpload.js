import env from 'dotenv'
env.config({ path: './.env' })

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
})

export const upload = async (path) => {
    return await cloudinary.uploader.upload(path, { folder: "mybrand" })
}
import jwt from 'jsonwebtoken'

const generateToken = (data) => {
    var payload = {
        ...data,
        // Expire in a month
        expire: Date.now() + 1000 * 60 * 60 * 24 * 30,
    }
    // eslint-disable-next-line no-undef
    var token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    return token
}

import { bucket } from '../configs/storage.js'

const uploadImage = (file, path) =>
    new Promise((resolve, reject) => {
        const { buffer } = file
        //const blob = bucket.file(originalname.replace(/ /g, '_'))
        //const blob = bucket.file(path)
        //const blob = bucket.file('test.jpg')
        const blob = bucket.file(path)
        const blobStream = blob.createWriteStream({
            resumable: false,
        })
        blobStream
            .on('finish', () => {
                const endUrl = blob.name
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                resolve({ endUrl, publicUrl })
            })
            .on('error', () => {
                reject('Unable to upload image, something went wrong')
            })
            .end(buffer)
    })

export { generateToken, uploadImage }

// import express from 'express'
// const router = express.Router()
// // import passport from 'passport'
// // import grantAccess from '../../middlewares/grantAcccess.js'
// // ================================
// import AWS from 'aws-sdk'
// const s3 = new AWS.S3()
// import { S3Client } from '@aws-sdk/client-s3'
// import multer from 'multer'
// import multerS3 from 'multer-s3'
// import sharp from 'sharp'

// // let s3 = new S3Client({
// //     region: 'ap-southeast-2',
// //     credentials: {
// //         // eslint-disable-next-line no-undef
// //         accessKeyId: process.env.ACCESS_KEY_AWS,
// //         // eslint-disable-next-line no-undef
// //         secretAccessKey: process.env.ACCESS_SECRET_AWS,
// //     },
// //     sslEnabled: false,
// //     s3ForcePathStyle: true,
// //     signatureVersion: 'v4',
// // })

// const imageFilter = (req, file, cb) => {
//     if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false)
//     }
//     cb(undefined, true)
// }
// const upload = multer({
//     fileFilter: imageFilter,
//     storage: multer.memoryStorage(), //storage
//     limits: {
//         fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
//     },

//     // storage: multerS3({
//     //     s3: s3,
//     //     // eslint-disable-next-line no-undef
//     //     bucket: process.env.BUCKET,
//     //     // key: function (req, file, cb) {
//     //     //     cb(null, Date.now().toString())
//     //     // },
//     // }),
// })

// router.post('/', upload.single('image'), async function (req, res) {
//     console.log(req.file)
//     var imgbuf = await sharp(req.file.buffer)
//         .resize(200)
//         .jpeg({ quality: 50 })
//         .jpeg({ mozjpeg: true })
//         .toBuffer()
//     console.log('xxxxxxxxxxxxxxxxxxxxxx')
//     console.log(imgbuf)
//     // await s3
//     //     .putObject({
//     //         Body: imgbuf,
//     //         // eslint-disable-next-line no-undef
//     //         Bucket: process.env.BUCKET,
//     //         Key: 'test.jpg',
//     //     })
//     //     .promise()
//     res.send('Successfully uploaded ' + req.file.originalname)
// })

// router.get('*', async (req, res) => {
//     let filename = req.path.slice(1)

//     try {
//         let s3File = await s3
//             .getObject({
//                 // eslint-disable-next-line no-undef
//                 Bucket: process.env.BUCKET,
//                 Key: filename,
//             })
//             .promise()

//         //res.set('Content-type', s3File.ContentType)
//         res.set('Content-type', 'image/jpeg')
//         console.log(s3File)
//         //res.send(s3File.Body.string()).end()
//         res.send(s3File.Body).end()
//     } catch (error) {
//         if (error.code === 'NoSuchKey') {
//             console.log(`No such key ${filename}`)
//             res.sendStatus(404).end()
//         } else {
//             console.log(error)
//             res.sendStatus(500).end()
//         }
//     }
// })

// router.put('*', async (req, res) => {
//     let filename = req.path.slice(1)

//     console.log(typeof req.body)

//     await s3
//         .putObject({
//             Body: JSON.stringify(req.body),
//             // eslint-disable-next-line no-undef
//             Bucket: process.env.BUCKET,
//             Key: filename,
//         })
//         .promise()

//     res.set('Content-type', 'text/plain')
//     res.send('ok').end()
// })

// // router.post(
// //     '/',
// //     //passport.authenticate('jwt', { session: false }),
// //     async (req, res) => {
// //         res.json('image ... || aaa')
// //     }
// // )

// export default router

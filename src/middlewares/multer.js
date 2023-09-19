import multer from 'multer'

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(undefined, true)
}
export const Image = multer({
    fileFilter: imageFilter,
    storage: multer.memoryStorage(), //storage
    limits: {
        fileSize: 3 * 1024 * 1024, // keep images size < 3 MB
    },
})

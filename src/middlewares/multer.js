import multer from 'multer'

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(undefined, true)
}

const markdownFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(md)$/)) {
        return cb(new Error('Only markdown files are allowed!'), false)
    }
    cb(undefined, true)
}

const cropFileFilter = (req, file, cb) => {
    if (file.fieldname === 'image') {
        imageFilter(req, file, cb)
    } else if (file.fieldname === 'markdown') {
        markdownFilter(req, file, cb)
    } else {
        cb(undefined, true)
    }
}

export const Image = multer({
    fileFilter: imageFilter,
    storage: multer.memoryStorage(), //storage
    limits: {
        fileSize: 3 * 1024 * 1024, // keep images size < 3 MB
    },
})

export const CropUpload = multer({
    fileFilter: cropFileFilter,
    storage: multer.memoryStorage(), //storage
    limits: {
        fileSize: 5 * 1024 * 1024, // keep images size < 3 MB
    },
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'markdown', maxCount: 1 },
])

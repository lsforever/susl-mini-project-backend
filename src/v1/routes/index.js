import express from 'express'
const router = express.Router()

//import rootRoutes from './root.js'
import docRoutes from './doc.js'
import authRoutes from './auth.js'
import userRoutes from './user.js'
import cropRoutes from './crop.js'
import categoryRoutes from './category.js'
import imagesRoutes from './image.js'

// root routes
//router.use('/', rootRoutes)
// doc routes
router.use('/doc', docRoutes)
// auth routes
router.use('/auth', authRoutes)
// user routes
router.use('/users', userRoutes)
// crop routes
router.use('/crops', cropRoutes)
// category routes
router.use('/categories', categoryRoutes)

// image routes
router.use('/images', imagesRoutes)

export default router

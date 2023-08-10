import express from 'express'
const router = express.Router()

import rootRoutes from './root.js'
// import docRoutes from './doc.js'
import authRoutes from './auth.js'
//import userRoutes from './user.js'
//import cropRoutes from './crop.js'

// root routes
router.use('/', rootRoutes)
// // doc routes
// router.use('/doc', docRoutes); //TODO remove docs
// auth routes
router.use('/auth', authRoutes)
// user routes
//router.use('/user', userRoutes)
// crop routes
//router.use('/crop', cropRoutes)

export default router

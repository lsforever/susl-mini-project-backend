import express from 'express'
const router = express.Router()

import docRoutes from './doc.js'

// doc routes
router.use('/doc', docRoutes)

export default router

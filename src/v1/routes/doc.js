import express from 'express'
const router = express.Router()

//import swaggerUi from 'swagger-ui-express'
import { openapiSpecificationV1 as swaggerSpec } from '../../configs/swaggerJsdoc.js'

//router.use('/', swaggerUi.serve)
//router.get('/', swaggerUi.setup(swaggerSpec))
router.get('/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

export default router

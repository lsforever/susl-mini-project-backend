import express from 'express'
const router = express.Router()

//import swaggerUi from 'swagger-ui-express'
import { openapiSpecificationV2 as swaggerSpec } from '../../configs/swaggerJsdoc.js'

//router.use('/', swaggerUi.serve)
//router.get('/', swaggerUi.setup(swaggerSpec))
router.get('/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

// /**
//  * @openapi
//  * /pets:
//  *   get:
//  *     security:
//  *       - bearerAuth: []
//  *     tags:
//  *       - Pet
//  *     parameters:
//  *       - in: query
//  *         name: platform
//  *         schema:
//  *           type: string
//  *         description: The platform of the game
//  *     responses:
//  *       200:
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: OK
//  *                 data:
//  *                   type: array
//  *                   items:
//  *       5XX:
//  *         description: FAILED
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: FAILED
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     error:
//  *                       type: string
//  *                       example: "Some error message"
//  */

export default router

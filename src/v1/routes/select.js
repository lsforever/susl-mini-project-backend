import express from 'express'
const router = express.Router()
import cropService from '../../services/crop.js'

/**
 * @openapi
 * /select:
 *   post:
 *     summary: Select a best suitable crop list
 *     description: Select a best suitable crop list by giving location etc
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Selects
 *     requestBody:
 *       description: The data to be used for cro selection
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: number
 *                     example: 41.40338
 *                   y:
 *                     type: number
 *                     example: 2.17403
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     docs:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Crop'
 *                     totalDocs:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pagingCounter:
 *                       type: integer
 *                       example: 1
 *                     hasPrevPage:
 *                       type: boolean
 *                     hasNextPage:
 *                       type: boolean
 *                     prevPage:
 *                       type: string
 *                       format: nullable
 *                     nextPage:
 *                       type: string
 *                       format: nullable
 *       400:
 *         description: Bad request. Invalid filter data supplied
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.post('/', async (req, res) => {
    const { body } = req
    console.log(body)
    const crops = await cropService.getCrops({}, {})

    res.status(200).send({
        status: 'OK',
        data: crops,
    })
})

import sss from '../../services/select.js'
router.get('/test', async (req, res) => {
    // const { body } = req
    // console.log(body)

    //var loc = point([80.96673, 6.73812])
    var data = await sss.getFilteredCropListAndData(80.96673, 6.73812) //122

    res.status(200).send({
        status: 'OK',
        data: data,
    })
})

export default router

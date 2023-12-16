import express from 'express'
const router = express.Router()
import passport from 'passport'
import selectController from '../../controllers/select.js'

/**
 * @openapi
 * /select:
 *   get:
 *     summary: Select a best suitable crop list
 *     description: Select a best suitable crop list by giving location etc
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Selects
 *     parameters:
 *       - in: path
 *         name: selections
 *         type: object
 *         required: true
 *         description: Send the object like the body.
 *     requestBody:
 *       description: The data to be used for crop selection
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: object
 *                 properties:
 *                   longitude:
 *                     type: number
 *                     example: 80.96673
 *                   latitude:
 *                     type: number
 *                     example: 6.73812
 *               is_long_term:
 *                 type: boolean
 *                 example: false
 *               starting_month:
 *                 type: number
 *                 example: 2
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
 *                   $ref: '#/components/schemas/Selects'
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
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    selectController.selectCrops
)

// import sss from '../../services/select.js'
// router.get('/test', async (req, res) => {
//     // const { body } = req
//     // console.log(body)

//     //var loc = point([80.96673, 6.73812])
//     var data = await sss.getFilteredCropListAndData(80.96673, 6.73812) //122

//     res.status(200).send({
//         status: 'OK',
//         data: data,
//     })
// })

export default router

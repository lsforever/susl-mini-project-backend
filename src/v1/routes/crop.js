import express from 'express'
const router = express.Router()
import passport from 'passport'
import cropController from '../../controllers/crop.js'
import grantAccess from '../../middlewares/grantAcccess.js'
import CropModel from '../../models/Crop.js'
import { CropUpload } from '../../middlewares/multer.js'

/**
 * @openapi
 * /crops:
 *   get:
 *     summary: Get crops list
 *     description: Returns a crop list based on filters
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Crops
 *     parameters:
 *       - name: data
 *         in: query
 *         description: Add filter query and pagination data options here
 *         required: true
 *         style: form
 *         explode: true
 *         schema:
 *           type: object
 *           required:
 *             - filter
 *             - options
 *           properties:
 *             filter:
 *               type: object
 *               example: {}
 *             options:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                   description: page number of the result.
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                   description: limit for a one single page.
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
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    cropController.getCrops
)

/**
 * @openapi
 * /crops/{cropId}:
 *   get:
 *     summary: Find crop by ID
 *     description: Returns a single crop
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Crops
 *     parameters:
 *       - in: path
 *         name: cropId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the crop
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
 *                   $ref: '#/components/schemas/Crop'
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Crop not found
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
    '/:cropId',
    passport.authenticate('jwt', { session: false }),
    cropController.getCrop
)

/**
 * @openapi
 * /crops:
 *   post:
 *     summary: Add a new crop
 *     description: Creates a new crop
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Crops
 *     requestBody:
 *       description: The crop data to be created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crop'
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
 *                   $ref: '#/components/schemas/Crop'
 *                   description: Created crop
 *       400:
 *         description: Bad Request
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
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    grantAccess('createAny', CropModel.modelName),
    /////Image.single('image'),
    CropUpload,
    cropController.createNewCrop
)
// import Crop from '../../models/Crop.js'
// import util from 'util'
// router.post('/kkk', async (req, res) => {
//     const crop = new Crop(req.body)
//     console.log(util.inspect(crop, false, null, true))
//     await crop.save()
//     res.status(200).send('kkk')
// })

/**
 * @openapi
 * /crops/{cropId}:
 *   patch:
 *     summary: Update an existing crop
 *     description: Update an existing crop by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Crops
 *     parameters:
 *       - in: path
 *         name: cropId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the crop
 *     requestBody:
 *       description: The crop data to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crop'
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
 *                   $ref: '#/components/schemas/Crop'
 *                   description: The updated crop
 *       400:
 *         description: Bad Request
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
router.patch(
    '/:cropId',
    passport.authenticate('jwt', { session: false }),
    grantAccess('updateAny', CropModel.modelName),
    cropController.updateOneCrop
)

/**
 * @openapi
 * /crops/{cropId}:
 *   delete:
 *     summary: Delete a crop
 *     description: Delete a single crop by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Crops
 *     parameters:
 *       - in: path
 *         name: cropId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the crop
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
 *                   type: string
 *                   description: ID of the deleted crop
 *                   example: 64dbeac4c84d7b5eb71b4cb1
 *       400:
 *         description: Bad Request
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
router.delete(
    '/:cropId',
    passport.authenticate('jwt', { session: false }),
    grantAccess('deleteAny', CropModel.modelName),
    cropController.deleteOneCrop
)

export default router

import express from 'express'
const router = express.Router()
import passport from 'passport'
import cropController from '../../controllers/crop.js'
import grantAccess from '../../middlewares/grantAcccess.js'
import CropModel from '../../models/Crop.js'

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

router.post(
    '/',
    //passport.authenticate('jwt', { session: false }),
    //grantAccess('createAny', CropModel.modelName),
    cropController.createNewCrop
)

router.patch(
    '/:cropId',
    passport.authenticate('jwt', { session: false }),
    grantAccess('updateAny', CropModel.modelName),
    cropController.updateOneCrop
)

router.delete(
    '/:cropId',
    passport.authenticate('jwt', { session: false }),
    grantAccess('deleteAny', CropModel.modelName),
    cropController.deleteOneCrop
)

export default router

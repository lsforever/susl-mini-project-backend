import express from 'express'
const router = express.Router()
import passport from 'passport'
import cropController from '../../controllers/crop.js'
import grantAccess from '../../middlewares/grantAcccess.js'
import CropModel from '../../models/Crop.js'

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    cropController.getAllCrops
)

router.get(
    '/:cropId',
    passport.authenticate('jwt', { session: false }),
    cropController.getOneCrop
)

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    grantAccess('createAny', CropModel.modelName),
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

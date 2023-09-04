import cropService from '../services/crop.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const getCrops = async (req, res) => {
    const filter = req.query.filter || {} // TODO change these to filter
    const options = req.query.options || {
        page: 1,
        limit: 10,
        collation: {
            locale: 'en',
        },
    } // TODO change these to options

    const crops = cropService.getCrops(filter, options)
    res.staus(StatusCodes.OK).json({
        status: ReasonPhrases.OK,
        data: crops,
    })
}

const getCrop = async (req, res) => {
    const {
        params: { cropId },
    } = req
    const crop = cropService.getCrop(cropId)
    res.staus(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: crop,
    })
}

const createNewCrop = async (req, res) => {
    const { body } = req
    // const newCrop = {
    //     name: body.name, // TODOdo validations
    // }
    const newCrop = body
    const createdCrop = cropService.createNewCrop(newCrop)
    res.staus(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: createdCrop,
    })
}

const updateOneCrop = async (req, res) => {
    const {
        body,
        params: { cropId },
    } = req

    const updatedCrop = cropService.updateOneCrop(cropId, body)
    res.staus(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: updatedCrop,
    })
}

const deleteOneCrop = async (req, res) => {
    const {
        params: { cropId },
    } = req
    cropService.deleteOneCrop(cropId)
    res.staus(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: cropId,
    })
}

export default {
    getCrops,
    getCrop,
    createNewCrop,
    updateOneCrop,
    deleteOneCrop,
}

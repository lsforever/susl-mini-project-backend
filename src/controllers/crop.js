import cropService from '../services/crop.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const getCrops = async (req, res) => {
    const data = JSON.parse(req.query.data)
    const filter = data.filter || {} // TODO change these to filter
    const options = data.options || {
        page: 1,
        limit: 10,
        collation: {
            locale: 'en',
        },
    } // TODO change these to options

    // const filter = req.query.filter || {} // TODO change these to filter
    // const options = req.query.options || {
    //     page: 1,
    //     limit: 10,
    //     collation: {
    //         locale: 'en',
    //     },
    // } // TODO change these to options
    options.populate = ['category'] //TODO category populate
    const crops = await cropService.getCrops(filter, options)
    res.status(StatusCodes.OK).json({
        status: ReasonPhrases.OK,
        data: crops,
    })
}

const getCrop = async (req, res) => {
    const {
        params: { cropId },
    } = req
    const crop = await cropService.getCrop(cropId)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: crop,
    })
}

const createNewCrop = async (req, res) => {
    const { body, files } = req
    // const newCrop = {
    //     name: body.name, // TODOdo validations
    // }

    const newCrop = JSON.parse(body.data)
    const createdCrop = await cropService.createNewCrop(newCrop, files)
    // const createdCrop = await cropService.createNewCrop(body, files)

    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: createdCrop,
    })
}

const updateOneCrop = async (req, res) => {
    const {
        body,
        params: { cropId },
    } = req

    const updatedCrop = await cropService.updateOneCrop(cropId, body)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: updatedCrop,
    })
}

const deleteOneCrop = async (req, res) => {
    const {
        params: { cropId },
    } = req
    await cropService.deleteOneCrop(cropId)
    res.status(StatusCodes.OK).send({
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

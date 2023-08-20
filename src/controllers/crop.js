import cropService from '../services/crop.js'

const getAllCrops = async (req, res) => {
    try {
        var page = req.params.page ? req.params.page : 1
        var limit = req.params.limit ? req.params.limit : 10

        const allCrops = cropService.getAllCrops()
        res.send({ status: 'OK', data: allCrops })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        })
    }
}

const getOneCrop = async (req, res) => {
    const {
        params: { cropId },
    } = req
    if (!cropId) {
        res.status(400).send({
            status: 'FAILED',
            data: { error: 'Parameter cropId can not be empty' },
        })
    }
    try {
        const crop = cropService.getOneCrop(cropId)
        res.send({ status: 'OK', data: crop })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        })
    }
}

const createNewCrop = async (req, res) => {
    const { body } = req
    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error: 'One of the following keys is missing or is empty in request body: name, mode, equipment, exercises, trainerTips',
            },
        })
        return
    }
    const newCrop = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips,
    }
    try {
        const createdCrop = cropService.createNewWorkout(newCrop)
        res.status(201).send({ status: 'OK', data: createdCrop })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        })
    }
}

const updateOneCrop = async (req, res) => {
    const {
        body,
        params: { cropId },
    } = req
    if (!cropId) {
        res.status(400).send({
            status: 'FAILED',
            data: { error: 'Parameter :cropId can not be empty' },
        })
    }
    try {
        const updatedCrop = cropService.updateOneCrop(cropId, body)
        res.send({ status: 'OK', data: updatedCrop })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        })
    }
}

const deleteOneCrop = async (req, res) => {
    const {
        params: { cropId },
    } = req
    if (!cropId) {
        res.status(400).send({
            status: 'FAILED',
            data: { error: 'Parameter :cropId can not be empty' },
        })
    }
    try {
        cropService.deleteOneCrop(cropId)
        res.status(204).send({ status: 'OK' })
    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        })
    }
}

export default { getAllCrops, getOneCrop, createNewCrop, updateOneCrop, deleteOneCrop }

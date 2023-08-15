import Crop from '../models/Crop.js'

const getAllCrops = async () => {
    try {
        return Crop.find()
    } catch (error) {
        throw { status: 500, message: error }
    }
}

const getOneCrop = (cropId) => {
    try {
        const crop = Crop.find((crop) => crop.id === cropId)
        if (!crop) {
            throw {
                status: 400,
                message: `Can't find crop with the id '${cropId}'`,
            }
        }
        return crop
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

const createNewCrop = (newCrop) => {
    try {
        const isAlreadyAdded =
            Crop.findIndex((crop) => crop.name === newCrop.name) > -1
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Crop with the name '${newCrop.name}' already exists`,
            }
        }
        Crop.push(newCrop).save()
        return newCrop
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

const updateOneCrop = (cropId, changes) => {
    try {
        const isAlreadyAdded =
            Crop.findIndex((crop) => crop.name === changes.name) > -1
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Crop with the name '${changes.name}' already exists`,
            }
        }
        const indexForUpdate = Crop.findIndex((crop) => crop.id === cropId)
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find crop with the id '${cropId}'`,
            }
        }
        const updatedCrop = {
            ...Crop[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        }
        Crop[indexForUpdate] = updatedCrop
        Crop.save()
        return updatedCrop
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

const deleteOneCrop = (cropId) => {
    try {
        const indexForDeletion = Crop.findIndex((crop) => crop.id === cropId)
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find crop with the id '${cropId}'`,
            }
        }
        Crop.splice(indexForDeletion, 1).delete()
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

export { getAllCrops, createNewCrop, getOneCrop, updateOneCrop, deleteOneCrop }

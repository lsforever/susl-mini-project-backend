import cropRepository from '../repositories/crop.js'

const getAllCrops = async () => {
    try {
        const allCrops = cropRepository.getAllCrops()
        return allCrops
    } catch (error) {
        throw error
    }
}

const getOneCrop = async (cropId) => {
    try {
        const crop = cropRepository.getOneCrop(cropId)
        return crop
    } catch (error) {
        throw error
    }
}

const createNewCrop = async (newCrop) => {
    const CropToInsert = {
        ...newCrop,
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    }
    try {
        const createdCrop = Crop.createNewCrop(CropToInsert)
        return createdCrop
    } catch (error) {
        throw error
    }
}

const updateOneCrop = async (cropId, changes) => {
    try {
        const updatedCrop = cropRepository.updateOneCrop(cropId, changes)
        return updatedCrop
    } catch (error) {
        throw error
    }
}

const deleteOneCrop = async (cropId) => {
    try {
        Crop.deleteOneCrop(cropId)
    } catch (error) {
        throw error
    }
}

export default {
    getAllCrops,
    getOneCrop,
    createNewCrop,
    updateOneCrop,
    deleteOneCrop,
}

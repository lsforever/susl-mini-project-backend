import cropRepository from '../repositories/crop.js'

const getCrops = async (query, options) => {
    const crops = cropRepository.getCrops(query, options)
    return crops
}

const getCrop = async (cropId) => {
    const crop = cropRepository.getCrop(cropId)
    return crop
}

const createNewCrop = async (newCrop) => {
    const createdCrop = cropRepository.createNewCrop(newCrop)
    return createdCrop
}

const updateOneCrop = async (cropId, changes) => {
    const updatedCrop = cropRepository.updateOneCrop(cropId, changes)
    return updatedCrop
}

const deleteOneCrop = async (cropId) => {
    cropRepository.deleteOneCrop(cropId)
}

export default {
    getCrops,
    getCrop,
    createNewCrop,
    updateOneCrop,
    deleteOneCrop,
}

import cropRepository from '../repositories/crop.js'

const getCrops = async (query, options) => {
    const crops = await cropRepository.getCrops(query, options)
    return crops
}

const getCrop = async (cropId) => {
    const crop = await cropRepository.getCrop(cropId)
    return crop
}

const createNewCrop = async (newCrop, files) => {
    const createdCrop = await cropRepository.createNewCrop(newCrop, files)
    return createdCrop
}

const updateOneCrop = async (cropId, changes) => {
    const updatedCrop = await cropRepository.updateOneCrop(cropId, changes)
    return updatedCrop
}

const deleteOneCrop = async (cropId) => {
    await cropRepository.deleteOneCrop(cropId)
}

export default {
    getCrops,
    getCrop,
    createNewCrop,
    updateOneCrop,
    deleteOneCrop,
}

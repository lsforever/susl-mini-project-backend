import Crop from '../models/Crop.js'

const getCrops = async (query, options) => {
    const crops = await Crop.paginate(query, options)
    return crops
}

const getCrop = async (cropId) => {
    const crop = await Crop.findById(cropId, null, { populate: 'category' })
    return crop
}

const createNewCrop = async (newCrop) => {
    const crop = new Crop(newCrop)
    await crop.save()
    return crop
}

const updateOneCrop = async (cropId, changes) => {
    const updatedCrop = await Crop.findByIdAndUpdate(cropId, changes, {
        new: true,
    })
    return updatedCrop
}

const deleteOneCrop = async (cropId) => {
    await Crop.findByIdAndDelete(cropId)
}

export default {
    getCrops,
    getCrop,
    createNewCrop,
    updateOneCrop,
    deleteOneCrop,
}

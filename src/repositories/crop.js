import Crop from '../models/Crop.js'
import { uploadImage } from '../utils/extentions.js'
import mime from 'mime-types'

const getCrops = async (query, options) => {
    const crops = await Crop.paginate(query, options)
    return crops
}

const getCrop = async (cropId) => {
    const crop = await Crop.findById(cropId, null, { populate: 'category' })
    return crop
}

const createNewCrop = async (newCrop, file) => {
    const crop = new Crop(newCrop)
    const id = String(crop._id)
    const { endUrl } = await uploadImage(
        file,
        'crops/' + `${id}.${mime.extension(file.mimetype)}`
    )
    crop.image = endUrl
    await crop.save()
    // https://storage.googleapis.com/staging.agro-project-396117.appspot.com/crops/650a294b01527757c3ca47c1.png
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

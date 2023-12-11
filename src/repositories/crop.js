import Crop from '../models/Crop.js'
import { uploadImage } from '../utils/extentions.js'
import mime from 'mime-types'

const getCrops = async (query, options) => {
    const crops = await Crop.paginate(query, options)
    return crops
}

const getCropsWithoutPagination = async (query) => {
    const crops = await Crop.find(query, null, { populate: 'category' })
    return crops
}

const getCrop = async (cropId) => {
    const crop = await Crop.findById(cropId, null, { populate: 'category' })
    return crop
}

const createNewCrop = async (newCrop, files) => {
    const crop = new Crop(newCrop)
    const id = String(crop._id)

    if (files.image[0]) {
        const { endUrl } = await uploadImage(
            files.image[0],
            'crops/images/' + `${id}.${mime.extension(files.image[0].mimetype)}`
        )
        crop.image = endUrl
    }

    if (files.markdown[0]) {
        const { endUrl } = await uploadImage(
            files.markdown[0],
            'crops/markdowns/' + `${id}.md`
        )
        crop.other = {}
        crop.other.extra = endUrl
    }

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

import { bucket } from '../configs/storage.js'
const deleteOneCrop = async (cropId) => {
    await Crop.findByIdAndDelete(cropId)
    try {
        await bucket.file(`crops/images/${cropId}.jpeg`).delete()
    } catch (error) {
        if (error.response.statusCode !== 404) {
            throw error
        }
    }
    try {
        await bucket.file(`crops/markdowns/${cropId}.md`).delete()
    } catch (error) {
        if (error.response.statusCode !== 404) {
            throw error
        }
    }
}

export default {
    getCrops,
    getCrop,
    createNewCrop,
    updateOneCrop,
    deleteOneCrop,
    getCropsWithoutPagination,
}

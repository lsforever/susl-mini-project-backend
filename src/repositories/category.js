import Category from '../models/Category.js'
import { uploadImage } from '../utils/extentions.js'
import mime from 'mime-types'

const getCategories = async (query, options) => {
    //const categories = await Category.find(query, null, options)
    const categories = await Category.paginate(query, options)
    return categories
}

const getCategory = async (categoryId) => {
    const category = await Category.findById(categoryId)
    return category
}

const createNewCategory = async (newCategory, file) => {
    const { endUrl } = await uploadImage(
        file,
        'categories/images/' +
            `${newCategory.name}.${mime.extension(file.mimetype)}`
    )
    newCategory.image = endUrl
    const category = new Category(newCategory)
    await category.save()
    return category
}

const updateOneCategory = async (categoryId, changes) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        changes,
        {
            new: true,
        }
    )
    return updatedCategory
}

import { bucket } from '../configs/storage.js'
const deleteOneCategory = async (categoryId) => {
    const category = await Category.findById(categoryId)
    await Category.findByIdAndDelete(categoryId)
    const name = category ? category.name : ''
    try {
        await bucket.file(`categories/images/${name}.jpeg`).delete()
    } catch (error) {
        if (error.response.statusCode !== 404) {
            throw error
        }
    }
}

export default {
    getCategory,
    getCategories,
    createNewCategory,
    updateOneCategory,
    deleteOneCategory,
}

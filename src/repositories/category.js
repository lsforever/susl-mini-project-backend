import Category from '../models/Category.js'

const getCategories = async (query, options) => {
    const categories = await Category.find(query, null, options)
    return categories
}

const getCategory = async (categoryId) => {
    const category = await Category.findById(categoryId)
    return category
}

const createNewCategory = async (newCategory) => {
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

const deleteOneCategory = async (categoryId) => {
    await Category.findByIdAndDelete(categoryId)
}

export default {
    getCategory,
    getCategories,
    createNewCategory,
    updateOneCategory,
    deleteOneCategory,
}

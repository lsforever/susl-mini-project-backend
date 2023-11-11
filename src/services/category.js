import categoryRepository from '../repositories/category.js'

const getCategories = async (query, options) => {
    const category = await categoryRepository.getCategories(query, options)
    return category
}

const getCategory = async (categoryId) => {
    const category = await categoryRepository.getCategory(categoryId)
    return category
}

const createNewCategory = async (newCategory, file) => {
    const createdCategory = await categoryRepository.createNewCategory(
        newCategory,
        file
    )
    return createdCategory
}

const updateOneCategory = async (categoryId, changes) => {
    const updatedCategory = await categoryRepository.updateOneCategory(
        categoryId,
        changes
    )
    return updatedCategory
}

const deleteOneCategory = async (categoryId) => {
    await categoryRepository.deleteOneCategory(categoryId)
}

export default {
    getCategory,
    getCategories,
    createNewCategory,
    updateOneCategory,
    deleteOneCategory,
}

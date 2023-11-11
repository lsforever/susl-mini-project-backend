import categoryService from '../services/category.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const getCategories = async (req, res) => {
    const filter = req.query.filter || {} // TODO change these to filter
    const options =
        req.query.options ||
        {
            // page: 1,
            // limit: 10,
            // collation: {
            //     locale: 'en',
            // },
        }
    const categories = await categoryService.getCategories(filter, options)
    res.status(StatusCodes.OK).json({
        status: ReasonPhrases.OK,
        data: categories,
    })
}

const getCategory = async (req, res) => {
    const {
        params: { categoryId },
    } = req
    const category = await categoryService.getCategory(categoryId)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: category,
    })
}

const createNewCategory = async (req, res) => {
    // const { body } = req
    // // const newCategory = {
    // //     name: body.name, // TODOdo validations
    // // }
    // const newCategory = body
    // const createdCategory = await categoryService.createNewCategory(newCategory)
    // res.status(StatusCodes.OK).send({
    //     status: ReasonPhrases.OK,
    //     data: createdCategory,
    // })
    const { body, file } = req
    // const newCategory = {
    //     name: body.name, // TODOdo validations
    // }
    const newCategory = { name: body.name }
    const createdCategory = await categoryService.createNewCategory(
        newCategory,
        file
    )
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: createdCategory,
    })
}

const updateOneCategory = async (req, res) => {
    const {
        body,
        params: { categoryId },
    } = req

    const updatedCategory = await categoryService.updateOneCategory(
        categoryId,
        body
    )
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: updatedCategory,
    })
}

const deleteOneCategory = async (req, res) => {
    const {
        params: { categoryId },
    } = req
    await categoryService.deleteOneCategory(categoryId)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: categoryId,
    })
}

export default {
    getCategory,
    getCategories,
    createNewCategory,
    updateOneCategory,
    deleteOneCategory,
}

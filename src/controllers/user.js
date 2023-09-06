import userService from '../services/user.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const getUsers = async (req, res) => {
    const filter = req.query.filter || {} // TODO change these to filter
    const options = req.query.options || {
        page: 1,
        limit: 10,
        collation: {
            locale: 'en',
        },
    } // TODO change these to options

    const users = await userService.getUsers(filter, options)
    res.status(StatusCodes.OK).json({
        status: ReasonPhrases.OK,
        data: users,
    })
}

const getUser = async (req, res) => {
    const {
        params: { userId },
    } = req
    const user = await userService.getUser(userId)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: user,
    })
}

const createNewUser = async (req, res) => {
    const { body } = req
    const newUser = {
        email: body.email,
        emailVerified: body.email,
        role: body.email,
        phone: body.email,
        name: body.email,
        photo: body.email,
    }
    const createdUser = await userService.createNewUser(newUser)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: createdUser,
    })
}

const updateOneUser = async (req, res) => {
    const {
        body,
        params: { userId },
    } = req

    const updatedUser = await userService.updateOneUser(userId, body)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: updatedUser,
    })
}

const deleteOneUser = async (req, res) => {
    const {
        params: { userId },
    } = req
    await userService.deleteOneUser(userId)
    res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        data: userId,
    })
}

export default {
    getUsers,
    getUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
}

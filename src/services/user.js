import userRepository from '../repositories/user.js'

const getUsers = async (query, options) => {
    const users = await userRepository.getUsers(query, options)
    return users
}

const getUser = async (userId) => {
    const user = await userRepository.getUser(userId)
    return user
}

const createNewUser = async (newUser) => {
    const createdUser = await userRepository.createNewUser(newUser)
    return createdUser
}

const updateOneUser = async (userId, changes) => {
    const updatedUser = await userRepository.updateOneUser(userId, changes)
    return updatedUser
}

const deleteOneUser = async (userId) => {
    await userRepository.deleteOneUser(userId)
}

export default {
    getUsers,
    getUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
}

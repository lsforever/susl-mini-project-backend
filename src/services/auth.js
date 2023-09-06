import authRepository from '../repositories/auth.js'
import { generateToken } from '../utils/extentions.js'

const registerUser = async (user, password) => {
    const doc = await authRepository.registerUser(user, password)
    return doc
}

// payload = { _id, role }
const getToken = (payload) => {
    var token = generateToken(payload)
    return token
}

const getUser = async (userId) => {
    const user = await authRepository.getUser(userId)
    return user
}

const updateOneUser = async (userId, changes) => {
    const updatedUser = await authRepository.updateOneUser(userId, changes)
    return updatedUser
}

export default { registerUser, getToken, getUser, updateOneUser }

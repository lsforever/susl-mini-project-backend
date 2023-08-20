import authRepository from '../repositories/auth.js'
import { generateToken } from '../utils/extentions.js'

const registerUser = async (user, password) => {
    const doc = await authRepository.registerUser(user, password)
    return doc
}

// payload = { _id, role }
const getToken = async (payload) => {
    var token = generateToken(payload)
    return token
}

export default { registerUser, getToken }

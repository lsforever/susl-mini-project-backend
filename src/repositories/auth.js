import User from '../models/User.js'

const registerUser = async (user, password) => {
    var doc = await User.register(user, password)
    return doc
}

const getUser = async (userId) => {
    const user = await User.findById(userId)
    return user
}

const updateOneUser = async (userId, changes) => {
    const updatedUser = await User.findByIdAndUpdate(userId, changes, {
        new: true,
    })
    return updatedUser
}

export default { registerUser, getUser, updateOneUser }

import User from '../models/User.js'

// limit
// skip
// populate
// projection | Select
// sort

const getUsers = async (query, options) => {
    // await User.find(filter).select('-password')
    //const users = await User.find(query, options)
    const users = await User.paginate(query, options)
    return users
}

const getUser = async (userId) => {
    const user = await User.findById(userId)
    return user
}

const createNewUser = async (newUser) => {
    const user = new User(newUser)
    await user.save()
    return user
}

const updateOneUser = async (userId, changes) => {
    const updatedUser = await User.findByIdAndUpdate(userId, changes, {
        new: true,
    })
    return updatedUser
}

const deleteOneUser = async (userId) => {
    await User.findByIdAndDelete(userId)
}

export default {
    getUsers,
    getUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
}

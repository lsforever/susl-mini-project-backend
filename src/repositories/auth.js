import User from '../models/User.js'

const registerUser = async (user, password) => {
    var doc = await User.register(user, password)
    return doc
}

export default { registerUser }

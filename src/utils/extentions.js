import jwt from 'jsonwebtoken'

const generateToken = (data) => {
    var payload = {
        ...data,
        // Expire in a month
        expire: Date.now() + 1000 * 60 * 60 * 24 * 30,
    }
    // eslint-disable-next-line no-undef
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

export { generateToken }

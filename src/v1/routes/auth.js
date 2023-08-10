import express from 'express'
const router = express.Router()
import User from '../../models/User.js'

router.post('/register', async (req, res, next) => {
    const { email, password, name } = req.body
    const user = new User({
        email,
        password,
        name,
    })
    var doc = await User.register(user, password, (error) => {
        if (error) {
            console.error('Error registering user:', error)
            return next(error)
        }
    })
    res.send(doc)
})

import passport from 'passport'
import jwt from 'jsonwebtoken'
router.post(
    '/login',
    passport.authenticate('local', { session: false }),
    async (req, res) => {
        try {
            if (req.isAuthenticated()) {
                var payload = {
                    email: req.user.email,
                    expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
                }
                // eslint-disable-next-line no-undef
                var token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
                res.json({ token: token })
            } else {
                res.json('Unauthorized')
            }
        } catch (error) {
            res.send('login error')
        }
    }
)

router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        res.send(JSON.stringify(req.user))
    }
)

export default router

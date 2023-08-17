import express from 'express'
const router = express.Router()
import User from '../../models/User.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'

router.post('/local/register', async (req, res) => {
    const { email, password, name } = req.body
    const user = new User({
        email,
        name,
    })
    var doc = await User.register(user, password)
    res.json(doc)
})

router.post(
    '/local/login',
    passport.authenticate('local', { session: false }),
    async (req, res) => {
        try {
            if (req.isAuthenticated()) {
                var token = generateToken({
                    email: req.user.email,
                })
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
        res.send(JSON.stringify('Access Given'))
    }
)

router.get(
    '/google',
    passport.authenticate('google', {
        session: false,
        // ['openid', 'profile', 'email']
        scope: ['profile', 'email'],
    })
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/api/v1/auth/google',
    }),
    async (req, res) => {
        // Successful authentication, redirect home.
        //res.redirect('/')

        var token = generateToken({
            email: req.user.email,
        })
        res.json({ user: req.user, token: token })
    }
)

const generateToken = (data) => {
    var payload = {
        ...data,
        // Expire in a month
        expire: Date.now() + 1000 * 60 * 60 * 24 * 30,
    }
    // eslint-disable-next-line no-undef
    return jwt.sign(payload, process.env.JWT_SECRET_KEY)
}

export default router

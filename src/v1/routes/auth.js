import express from 'express'
const router = express.Router()
import User from '../../models/User.js'

router.get('/test', async (req, res) => {
    res.send('auth test success')
})

router.post('/test', async (req, res) => {
    res.json('Post test success')
})

router.post('/local/register', async (req, res, next) => {
    const { email, password, name } = req.body
    const user = new User({
        email,
        password,
        name,
    })
    // var doc = await User.register(user, password, (error) => {
    //     if (error) {
    //         console.error('Error registering user:', error)
    //         return next(error)
    //     }
    // })

    var doc = await User.register(user, password)
    res.send(doc)
})

import passport from 'passport'
import jwt from 'jsonwebtoken'
router.post(
    '/local/login',
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
    function (req, res) {
        // Successful authentication, redirect home.
        //res.redirect('/')

        var payload = {
            profile: req.user,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
        }
        // eslint-disable-next-line no-undef
        var token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
        res.json({ profile: req.user, token: token })
    }
)

export default router

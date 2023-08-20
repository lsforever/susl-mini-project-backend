import express from 'express'
const router = express.Router()
import passport from 'passport'
import authController from '../../controllers/auth.js'

router.post('/local/register', authController.registerUser)

router.post(
    '/local/login',
    passport.authenticate('local', { session: false }),
    authController.localLogin
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
    authController.googleCallback
)

export default router

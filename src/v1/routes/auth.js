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

/**
 * @openapi
 * /auth/google:
 *   get:
 *     summary: Google Login
 *     description: Returns a JWT token for login with google
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   description: Use this token for the JWT authentication
 *                   type: string
 *                   example: 'eyJhbGciOyJIUzI1NiIsInR6cCI6IkpXVCJ9.eyJfaWQiOiI1NGY3YTQyZTdlYxZiNTg4N2QxZDJmOTYiLCJyb2xlIjoidXNlciIsImV4cGlyZSI6MTY5NjU0NDI4NTE0NSwiaWF0IjoxNjkzOTUyMjg1fQ.IIqR7YEkxUIIGBbN0t1icak62ZC6nqNCRxNgoK1Y5Io'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
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

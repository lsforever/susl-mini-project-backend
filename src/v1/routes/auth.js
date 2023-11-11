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

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get my user profile data
 *     description: Returns the data of the logged in user
 *     security:
 *       - bearerAuth: []
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
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
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
    '/me',
    passport.authenticate('local', { session: false }),
    authController.getMyProfile
)

/**
 * @openapi
 * /auth/me:
 *   patch:
 *     summary: Update my user profile data
 *     description: Update logged in user's data
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: The user data to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                   description: The updated User
 *       400:
 *         description: Bad Request
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
router.patch(
    '/me',
    passport.authenticate('local', { session: false }),
    authController.updateMyProfile
)

/**
 * @openapi
 * /auth/google/token:
 *   post:
 *     summary: Google Login
 *     description: Returns a JWT token for login with google
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Add the token ID for the google login
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'ssshiuduihduhachuhfuhfuiahfuh.fakjfhfa.fahfaf.figfh'
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
//TODOadd the docs jsondoc here for this api endpoint
//TODO remove below code and add them to a controller
import { OAuth2Client } from 'google-auth-library'
import User from '../../models/User.js'
import authService from '../../services/auth.js'
router.post('/google/token', async (req, res) => {
    const token = req.body.token || ''
    const client = new OAuth2Client() //TODO set the client secrete and etc
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                '148267645714-5iq43m9ekje8vh7u80jf545448d4gko8.apps.googleusercontent.com',
                '148267645714-cl3uelsc67tk5pni5bkbic3d63hhe52q.apps.googleusercontent.com',
            ], //TODO add to env // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        const payload = ticket.getPayload()
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        //res.json(payload)

        var { sub, name, email, picture, email_verified } = payload
        if (!email_verified) {
            throw new Error('Email Not Verified')
        }
        var user = await User.findOne({ email: email })
        if (!user) {
            user = await User.create({
                email,
                name,
                photo: picture,
                googleId: sub,
                emailVerified: email_verified,
            })
        }
        var jwt_payload = { _id: user._id, role: user.role }
        var jwt_token = authService.getToken(jwt_payload)
        res.status(200).json({
            status: 'OK',
            user: user,
            token: jwt_token,
        })
    }
    try {
        await verify()
    } catch (error) {
        res.status(401).json('unauthorized')
    }
})

export default router

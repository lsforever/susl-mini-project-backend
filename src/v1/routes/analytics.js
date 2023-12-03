import express from 'express'
const router = express.Router()
import passport from 'passport'
import analyticsController from '../../controllers/analytics.js'
import grantAccess from '../../middlewares/grantAcccess.js'

/**
 * @openapi
 * /analytics:
 *   get:
 *     summary: Get analytics
 *     description: Returns analytics
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Analytics
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
 *                   $ref: '#/components/schemas/Analytics'
 *       400:
 *         description: Bad request. Invalid filter data supplied
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
    '/',
    passport.authenticate('jwt', { session: false }),
    grantAccess('readAny', 'analytics'),
    analyticsController.getAnalytics
)

/**
 * @openapi
 * /analytics/healthcheck:
 *   get:
 *     summary: Server health check
 *     description: Returns health check and uptime
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                   example: 3.1019807
 *       400:
 *         description: Bad request. Invalid filter data supplied
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
// router.get('/healthcheck', expressHealthcheck())
router.get('/healthcheck', analyticsController.performHealthCheck)

export default router

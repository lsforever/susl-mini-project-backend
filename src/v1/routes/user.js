import express from 'express'
const router = express.Router()

import userController from '../../controllers/user.js'

router.get('/', userController.getUsers)

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Find user by ID
 *     description: Returns a single user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
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
 *         description: Invalid ID supplied
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
router.get('/:userId', userController.getUser)

router.post('/', userController.createNewUser)

router.patch('/:userId', userController.updateOneUser)

router.delete('/:userId', userController.deleteOneUser)

export default router

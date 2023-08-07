import express from 'express';
const router = express.Router();

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../configs/swaggerJsdoc.js';

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));
router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @openapi
 * /api/v1/games:
 *   get:
 *     tags:
 *       - Games
 *     parameters:
 *       - in: query
 *         name: platform
 *         schema:
 *           type: string
 *         description: The platform of the game
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
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Game"
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
router.get('/test', (req, res) => {
  res.send('docs success');
});

export default router;

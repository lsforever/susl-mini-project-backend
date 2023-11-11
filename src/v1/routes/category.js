import express from 'express'
const router = express.Router()
import passport from 'passport'
import categoryController from '../../controllers/category.js'
import grantAccess from '../../middlewares/grantAcccess.js'
import CategoryModel from '../../models/Category.js'
import { Image } from '../../middlewares/multer.js'

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get categories list
 *     description: Returns a category list based on filters
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: data
 *         in: query
 *         description: Add filter query and pagination data options here
 *         required: true
 *         style: form
 *         explode: true
 *         schema:
 *           type: object
 *           required:
 *             - filter
 *             - options
 *           properties:
 *             filter:
 *               type: object
 *               example: {}
 *             options:
 *               type: object
 *               example: {}
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
 *                     $ref: '#/components/schemas/Category'
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
    categoryController.getCategories
)

/**
 * @openapi
 * /categories/{categoryId}:
 *   get:
 *     summary: Find category by ID
 *     description: Returns a single category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category
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
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Category not found
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
    '/:categoryId',
    passport.authenticate('jwt', { session: false }),
    categoryController.getCategory
)

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Add a new category
 *     description: Creates a new category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     requestBody:
 *       description: The category data to be created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
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
 *                   $ref: '#/components/schemas/Category'
 *                   description: Created category
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
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    grantAccess('createAny', CategoryModel.modelName),
    Image.single('image'),
    categoryController.createNewCategory
)

/**
 * @openapi
 * /categories/{categoryId}:
 *   patch:
 *     summary: Update an existing category
 *     description: Update an existing category by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category
 *     requestBody:
 *       description: The category data to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
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
 *                   $ref: '#/components/schemas/Category'
 *                   description: The updated category
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
    '/:categoryId',
    passport.authenticate('jwt', { session: false }),
    grantAccess('updateAny', CategoryModel.modelName),
    categoryController.updateOneCategory
)

/**
 * @openapi
 * /categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a single category by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category
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
 *                   type: string
 *                   description: ID of the deleted category
 *                   example: 64dbeac4c84d7b5eb71b4cb1
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
router.delete(
    '/:categoryId',
    passport.authenticate('jwt', { session: false }),
    grantAccess('deleteAny', CategoryModel.modelName),
    categoryController.deleteOneCategory
)

export default router

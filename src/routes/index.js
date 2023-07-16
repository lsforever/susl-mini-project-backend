import express from 'express'
const router = express.Router()

import docsRouter from './docsRoutes.js';

//docs
router.use('/api-docs', docsRouter);


export default router;
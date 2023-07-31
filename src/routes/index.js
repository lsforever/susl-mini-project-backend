import express from 'express'
const router = express.Router()

import docRouter from './doc.js'
import cropRouter from './crops.js'

// docs
router.use('/api-doc', docsRouter);
// crops
router.use('/crop', cropRouter);

export default router;


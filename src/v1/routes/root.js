import express from 'express'
const router = express.Router()
import CustomError from '../../utils/errors/CustomError.js'

import { ReasonPhrases, StatusCodes } from 'http-status-codes'

router.get('/test', async (req, res) => {
    res.send('success')
})

router.get('/error', async (req, res) => {
    throw new CustomError(StatusCodes.BAD_GATEWAY, ReasonPhrases.BAD_GATEWAY, {
        msg: 10,
        kk: 'sss',
        yy: 'yyyyy',
    })
})

export default router

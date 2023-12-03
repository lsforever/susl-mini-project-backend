import analyticsService from '../services/analytics.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const getAnalytics = async (req, res) => {
    const analytics = await analyticsService.getAnalytics()
    res.status(StatusCodes.OK).json({
        status: ReasonPhrases.OK,
        data: analytics,
    })
}

import expressHealthcheck from 'express-healthcheck'
const performHealthCheck = expressHealthcheck()

export default {
    getAnalytics,
    performHealthCheck,
}

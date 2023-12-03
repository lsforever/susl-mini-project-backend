import analyticsRepository from '../repositories/analytics.js'

const getAnalytics = async () => {
    const analytics = await analyticsRepository.getAnalytics()
    return analytics
}

export default {
    getAnalytics,
}

import accessControl from '../configs/accessControl.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        const permission = accessControl.can(req.user.role)[action](resource)
        if (!permission.granted) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: ReasonPhrases.UNAUTHORIZED,
            })
        }
        req.permission = permission
        // Permissions will be available in next()
        // {
        //      permission.granted // true
        //      permission.attributes // ['*', '!record.id']
        //      permission.filter(data) // filtered data (without record.id)
        // }
        next()
    }
}

export default grantAccess

class ApiError extends Error {
    constructor(statusCode, message, response) {
        super(message || 'Unknown Error')
        this.statusCode = statusCode
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'

        this.isOperational = true
        this.body = response || {} //TODO check if needed

        //this.message = message //TODO check if needed

        Error.captureStackTrace(this, this.constructor)
    }
}

export default ApiError

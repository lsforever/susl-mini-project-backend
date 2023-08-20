/* eslint-disable no-undef */
import ApiError from '../utils/errors/ApiError.js'
import {
    ReasonPhrases,
    StatusCodes,
    //getReasonPhrase,
    //getStatusCode,
} from 'http-status-codes'

const formatFinalResponse = (code, message, body) => {
    return {
        status: code,
        message: message,
        details: body,
    }
}

const devErrors = (res, error) => {
    console.log(error.stack)
    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
        body: error.body,
        stackTrace: error.stack,
        error: error,
        // status: error.statusCode,
        // message: error.message,
        // stackTrace: error.stack,
        // error: error,
    })
}

const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}!`
    return new ApiError(msg, StatusCodes.BAD_REQUEST)
}

const duplicateKeyErrorHandler = (err) => {
    const name = err.keyValue.name
    const msg = `There is a duplicate key ${name}. Please use another name!`

    return new ApiError(msg, StatusCodes.BAD_REQUEST)
}

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map((val) => val.message)
    const errorMessages = errors.join('. ')
    const msg = `Invalid input data: ${errorMessages}`

    return new ApiError(msg, StatusCodes.BAD_REQUEST)
}

const prodErrors = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json(
            formatFinalResponse(error.statusCode, error.message, error.body)
        )
        // res.status(error.statusCode).json({
        //     status: error.statusCode,
        //     message: error.message,
        // })
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            formatFinalResponse(
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.INTERNAL_SERVER_ERROR,
                'Something went wrong! Please try again later.'
            )
        )
        // res.status(500).json({
        //     status: 'error',
        //     message: 'Something went wrong! Please try again later.'
        // })
    }
}

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    error.status = error.status || 'error'

    //var env = process.env.NODE_ENV || 'development'
    if (process.env.NODE_ENV === 'development') {
        devErrors(res, error)
    } else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'CastError') error = castErrorHandler(error)
        if (error.code === 11000) error = duplicateKeyErrorHandler(error)
        if (error.name === 'ValidationError')
            error = validationErrorHandler(error)

        prodErrors(res, error)
    } else {
        // undefined env
        devErrors(res, error)
    }
    // if (process.env.NODE_ENV === 'development') {
    //     devErrors(res, error)
    // } else if (process.env.NODE_ENV === 'production') {
    //     if (error.name === 'CastError') error = castErrorHandler(error)
    //     if (error.code === 11000) error = duplicateKeyErrorHandler(error)
    //     if (error.name === 'ValidationError')
    //         error = validationErrorHandler(error)

    //     prodErrors(res, error)
    // }
}

export default globalErrorHandler

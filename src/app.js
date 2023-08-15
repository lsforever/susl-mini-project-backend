/* eslint-disable no-undef */
import express from 'express'
import bodyParser from 'body-parser'

// async error wraper
import 'express-async-errors'

const app = express()

// Connect Databse
import connect from './configs/db.js'
await connect()

import cors from 'cors'
app.use(cors())

//body parser for parsing request body
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
        // parameterLimit: 100000,
        // limit: "20mb",
        // type: "application/json"
    })
)

import morganMiddleware from './middlewares/morganMiddleware.js'
app.use(morganMiddleware)

app.get('/check', (req, res) => {
    res.send('Success 1')
})

// docs
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './configs/swaggerJsdoc.js'
app.use('/api/doc', swaggerUi.serve)
app.get('/api/doc', swaggerUi.setup(swaggerSpec))
app.get('/api/doc/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})
////////////////////////////////////////////////////
// import swaggerUi from 'swagger-ui-express'
// import {
//     openapiSpecificationV1,
//     //openapiSpecificationV2,
// } from './configs/swaggerJsdoc.js'

// var options = {
//     explorer: true,
//     swaggerOptions: {
//         urls: [
//             {
//                 url: '/api/doc/v1/json',
//                 name: 'v1',
//             },
//             {
//                 url: '/api/doc/v2/json',
//                 name: 'v2',
//             },
//         ],
//     },
// }

//app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, options))

//app.use('/api/v1/doc', swaggerUi.serve)
//app.get('/api/v1/doc', swaggerUi.setup(openapiSpecificationV1))
//app.use('/api/v2/doc', swaggerUi.serve)
//app.get('/api/v2/doc', swaggerUi.setup(openapiSpecificationV2))
// app.get('/api/doc/v1/json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.send(openapiSpecificationV1)
// })
// app.get('/api/doc/v2/json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.send(openapiSpecificationV2)
// })

// HEalth check route //TODO change it
import expressHealthcheck from 'express-healthcheck'
app.use('/healthcheck', expressHealthcheck())

// adding rate limiters
import limiters from './middlewares/rateLimiterExpress.js'
//import redisLimiters from "./middlewares/rateLimiterWithRedis.js";
//app.use(limiters) //TODO uncomment this only
//app.use(redisLimiters);
//TODO add to loaders

///////////////////////////////////////////////////////////////////
import Logger from './configs/logger.js'
app.get('/test', (req, res) => {
    Logger.error('This is an error log')
    Logger.warn('This is a warn log')
    Logger.info('This is a info log')
    Logger.http('This is a http log')
    Logger.debug('This is a debug log')

    res.send('test 1')
})
/////////////////////////////////////////////////////////////////////

import v1Routes from './v1/routes/index.js'
app.use('/api/v1/', v1Routes)

//TODO remove below
import passport from 'passport'
//import { Strategy as LocalStrategy } from 'passport-local'
//import User from './models/User.js'
app.use(passport.initialize())
import passportConfig from './configs/passport.js'
passportConfig()
//passport.use(new LocalStrategy(User.authenticate()))
//passport.serializeUser(User.serializeUser())
//passport.deserializeUser(User.deserializeUser())

import globalErrorHandler from './middlewares/globalErrorhandler.js'
app.use(globalErrorHandler)

//TODO add rate limiters

export default app

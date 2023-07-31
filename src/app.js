import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()


// Connect Databse
import connect from './configs/db.js'
connect()



// session
const session = session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create(options)
})



import cors from 'cors'
app.use(cors())


//body parser for parsing request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


/**
 * @openapi
 * /:
 *   get:
 *     description: Success check
 *     responses:
 *       200:
 *         description: Returns a "Success" string.
 */
app.get('/', (req, res) => {
    res.send('Success');
});


import router from './routes/index.js';
app.use('/api', router);

export default app;
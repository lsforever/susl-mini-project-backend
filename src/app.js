import express from 'express';
import bodyParser from 'body-parser';

const app = express();


import dotenv from 'dotenv'
dotenv.config()


import cors from 'cors';
app.use(cors());

app.use(bodyParser.json());

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
app.use("/api/v1", router);

export default app;
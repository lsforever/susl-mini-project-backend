import express from "express";
import bodyParser from "body-parser";

const app = express();

// Connect Databse
import connect from "./configs/db.js";
connect();

import cors from "cors";
app.use(cors());

//body parser for parsing request body
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
        // parameterLimit: 100000,
        // limit: "20mb",
        // type: "application/json"
    })
);

import morganMiddleware from "./configs/morganMiddleware.js";
app.use(morganMiddleware);

app.get("/check", (req, res) => {
    res.send("Success 1");
});

// HEalth check route //TODO change it
import expressHealthcheck from "express-healthcheck";
app.use("/healthcheck", expressHealthcheck());

//TODO add to loaders

//import routes from "./routes/index.js";
//app.use("/api", routes);

//TODO add rate limiters

export default app;

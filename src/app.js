const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');

const cors = require("cors");

const favicon = require("express-favicon");

const logger = require("morgan");


const mainRouter = require('./routes/mainRouter.js');

const corsOptions = {
    origin: 'http://localhost:5173', // front-end URL
    credentials: true, // Allows cookies to be sent
};

app.use(cors(corsOptions));

/* ============================================================= */
// middleware
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

/* ============================================================= */
// routes
app.use('/api/v1', mainRouter);

/* ============================================================= */
module.exports = app;

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("./models/config");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routers/mainRouter");
dotenv.config();
const port = 5000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(__dirname));
app.use(cookieParser());

app.use(router);

const server = app.listen(process.env.PORT, function (req, res) {
  console.log(`server is running on port : ${process.env.port}`);
});

module.exports = server;

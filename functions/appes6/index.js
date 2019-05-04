const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const routes = require("./routes");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json({}));
app.use("/", routes);
module.exports = app;

const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors');
const routesRouter = require('./routes/routes.router');

app.use(cors());
// CORS API access approval to requesting domain below
app.use(function(req, res, next) {
//   const allowedDomains = ["http://localhost:3000", "https://restaurant-reservation-application.vercel.app"];
//   const origin = req.hseaders.origin;
//   if (allowedDomains.includes(origin)) {
// }
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

app.use('/', routesRouter);

module.exports = app;
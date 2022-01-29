const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors');
const plaidAPIRouter = require('./plaidAPI/plaidAPI.router');
const accessTokenRouter = require('./tokenStorage/accessToken.router');
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

app.use(cors());
// CORS API access approval to requesting domain below
app.use(function(req, res, next) {
  // const allowedDomains = ["http://localhost:3000", "https://acc-balance-and-transactions-app.vercel.app"];
  // const origin = req.headers.origin;
  // if (!allowedDomains.includes(origin)) {
  //   next({ status: 400, message: `Access to fetch at from origin ${origin} has been blocked by CORS policy.` })
  // }
  res.header("Access-Control-Allow-Origin", "https://acc-balance-and-transactions-app.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

app.use('/', plaidAPIRouter);
app.use('/accessToken', accessTokenRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
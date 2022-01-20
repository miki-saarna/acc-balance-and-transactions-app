// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const app = express();
const cors = require('cors');
const routesController = require('./routes/routes.controller');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const {
    PORT,
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_ENV,
    PLAID_PRODUCTS,
    PLAID_COUNTRY_CODES,
    PLAID_REDIRECT_URI,
} = process.env;

app.use(cors());
// CORS API access approval to requesting domain below
app.use(function(req, res, next) {
//   const allowedDomains = ["http://localhost:3000", "https://restaurant-reservation-application.vercel.app"];
//   const origin = req.headers.origin;
//   if (allowedDomains.includes(origin)) {
// }
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

const configuration = new Configuration({
    basePath: PlaidEnvironments[PORT],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
            'PLAID-SECRET': PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        }
    }
})

const plaidClient = new PlaidApi(configuration);

app.use('/', routesController);

app.post("/link/token/create", function (request, response, next) {
    Promise.resolve()
      .then(async function () {
        const configs = {
          user: {
            // This should correspond to a unique id for the current user.
            client_user_id: 'user-id',
          },
          client_name: 'Plaid Quickstart',
          products: 'auth,transactions'.split(','),
          country_codes: 'US,CA'.split(','),
          language: 'en',
        };

        const createTokenResponse = await plaidClient.linkTokenCreate(configs);
        
        // prettyPrintResponse(createTokenResponse);
        response.json(createTokenResponse.data);
      })
      .catch(next);
});

let myToken;

// app.post('/api/set_access_token', function (request, response, next) {
app.post('/item/public_token/exchange', function (request, response, next) {
    // unsure where this comes from
    const { public_token } = request.body;
    Promise.resolve()
      .then(async function () {
        const tokenResponse = await plaidClient.itemPublicTokenExchange({
          public_token,
        });

        // prettyPrintResponse(tokenResponse);
        ACCESS_TOKEN = tokenResponse.data.access_token;
        ITEM_ID = tokenResponse.data.item_id;
        myToken = ACCESS_TOKEN;
        // if (PLAID_PRODUCTS.includes('transfer')) {
        //   TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
        // }
        response.json({
          access_token: ACCESS_TOKEN,
          item_id: ITEM_ID,
          error: null,
        });
        console.log(ACCESS_TOKEN)
      })
      .catch(next);
  });

  app.get('/api/balance', function (request, response, next) {
    Promise.resolve()
      .then(async function () {
        const balanceResponse = await plaidClient.accountsBalanceGet({
          access_token: myToken,
        });
        // prettyPrintResponse(balanceResponse);
        response.json(balanceResponse.data);
      })
      .catch(next);
  });
  

module.exports = app;
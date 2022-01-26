require("dotenv").config();
const accessTokenController = require('../tokenStorage/accessToken.controller');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// const AccessToken = require('../mongoDB/accessTokenSchema');

const {
    PORT,
    PLAID_CLIENT_ID,
    PLAID_SECRET,
    PLAID_ENV,
    PLAID_PRODUCTS,
    PLAID_COUNTRY_CODES,
    PLAID_REDIRECT_URI,
} = process.env;

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid')

const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
            'PLAID-SECRET': PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        }
    }
})

const plaidClient = new PlaidApi(configuration);

async function generateLinkToken(request, response, next) {
    Promise.resolve()
      .then(async function () {
        const configs = {
          user: {
            // This should correspond to a unique id for the current user.
            client_user_id: 'user-id',
          },
          client_name: 'Plaid Quickstart',
          products: PLAID_PRODUCTS.split(','),
          country_codes: PLAID_COUNTRY_CODES.split(','),
          language: 'en',
        };
        const createTokenResponse = await plaidClient.linkTokenCreate(configs);
        // prettyPrintResponse(createTokenResponse);
        response.json(createTokenResponse.data);
      })
      .catch(next);
};

// app.post('/api/set_access_token', function (request, response, next) {
async function exchangeForAccessToken(request, response, next) {
    // unsure where this comes from
    const { public_token } = request.body;
    // console.log(public_token)
    Promise.resolve()
      .then(async function () {
        // console.log(public_token)
        const tokenResponse = await plaidClient.itemPublicTokenExchange({
          public_token,
        });
        // prettyPrintResponse(tokenResponse);
        ACCESS_TOKEN = tokenResponse.data.access_token;
        ITEM_ID = tokenResponse.data.item_id;
        // if (PLAID_PRODUCTS.includes('transfer')) {
        //   TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
        // }
        response.json({
          access_token: ACCESS_TOKEN,
          item_id: ITEM_ID,
          error: null,
        });
        process.env.ACCESS_TOKEN = ACCESS_TOKEN;
        
        // accessToken = ACCESS_TOKEN;
      })
      .catch(next);
  };

  async function getBalance(request, response, next) {
    const accessToken = process.env.ACCESS_TOKEN
    Promise.resolve()
      .then(async function () {
        const balanceResponse = await plaidClient.accountsBalanceGet({
          access_token: accessToken,
        });
        // prettyPrintResponse(balanceResponse);
        response.json(balanceResponse.data);
      })
      .catch(next);
  };

async function getTransactions(req, res, next) {
  const accessToken = process.env.ACCESS_TOKEN;
  // const accessToken = "access-sandbox-1521a18a-e3fe-43df-bca7-e901305ea874";
  const currentDateArray = new Date().toLocaleString().split(',')[0].split('/');
  const currentDate = [currentDateArray[2], `0${currentDateArray[0]}`, currentDateArray[1]].join('-');
  const thirtyDaysInMS = 1000 * 60 * 60 * 24 * 30;
  const thirtyDaysAgoDateArray = new Date(Date.now() - thirtyDaysInMS).toLocaleString().split(',')[0].split('/');
  const thirtyDaysAgoDate = [thirtyDaysAgoDateArray[2], thirtyDaysAgoDateArray[0], thirtyDaysAgoDateArray[1]].join('-');

  const request = {
    // const request: TransactionsGetRequest = {
    access_token: accessToken,
    start_date: thirtyDaysAgoDate,
    end_date: currentDate
  };
  
  try {
    const response = await plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;
    const total_transactions = response.data.total_transactions;
    // Manipulate the offset parameter to paginate
    // transactions and retrieve all available data
    while (transactions.length < total_transactions) {
      const paginatedRequest = {
        // const paginatedRequest: TransactionsGetRequest = {
        access_token: accessToken,
        start_date: '2020-01-01',
        end_date: '2020-12-01',
        options: {
          offset: transactions.length,
        },
      };
      const paginatedResponse = await plaidClient.transactionsGet(paginatedRequest);
      transactions = transactions.concat(
        paginatedResponse.data.transactions,
      );
    }
    res.json(transactions)
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
    generateLinkToken: asyncErrorBoundary(generateLinkToken),
    exchangeForAccessToken: asyncErrorBoundary(exchangeForAccessToken),
    getBalance: asyncErrorBoundary(getBalance),
    getTransactions: asyncErrorBoundary(getTransactions),
}
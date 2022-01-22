const router = require('express').Router();
const controller = require('./plaidAPI.controller');

router.route('/link/token/create').post(controller.generateLinkToken);
router.route('/item/public_token/exchange').post(controller.exchangeForAccessToken);
router.route('/api/balance').get(controller.getBalance);
router.route('/transactions/get').get(controller.getTransactions);

module.exports = router;
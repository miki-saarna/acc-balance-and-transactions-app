const router = require('express').Router();
const controller = require('./plaidAPI.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/link/token/create').post(controller.generateLinkToken).all(methodNotAllowed);
router.route('/item/public_token/exchange').post(controller.exchangeForAccessToken).all(methodNotAllowed);
router.route('/api/balance').get(controller.getBalance).all(methodNotAllowed);
router.route('/transactions/get').get(controller.getTransactions).all(methodNotAllowed);

module.exports = router;
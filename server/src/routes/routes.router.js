const router = require('express').Router();
const controller = require('./routes.controller');

router.route('/link/token/create').post(controller.generateLinkToken);
router.route('/item/public_token/exchange').post(controller.exchangeForAccessToken);
router.route('/api/balance').get(controller.getBalance);

module.exports = router
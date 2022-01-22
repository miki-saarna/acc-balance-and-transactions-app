const router = require('express').Router();
const controller = require('./accessToken.controller');

router.route('/').get(controller.list).post(controller.storeToken);
router.route('/:id').get(controller.read).patch(controller.update).delete(controller.destroy);

module.exports = router;
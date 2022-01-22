const router = require('express').Router();
const controller = require('./accessToken.controller');

router.route('/').get(controller.list).post(controller.create);
router.route('/:id').get(controller.read).patch(controller.update).delete(controller.destroy);

module.exports = router;
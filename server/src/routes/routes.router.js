const router = require('express').Router();
const controller = require('./routes.controller');
const AccessToken = require('../mongoDB/accessTokenSchema');

router.route('/link/token/create').post(controller.generateLinkToken);
router.route('/item/public_token/exchange').post(controller.exchangeForAccessToken);
router.route('/api/balance').get(controller.getBalance);

async function getToken(req, res, next) {
    try {
        tokenFound = await AccessToken.findById(req.params.id)
        if (tokenFound == null) {
            return res.status(404).json({ message: `cannot find token`})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.tokenFound = tokenFound
    next()
}

router.get('/accessToken/storage', async (req, res) => {
    try {
        const tokens = await AccessToken.find();
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ messsage: err.message})
    }
})

router.get('/accessToken/storage/:id', getToken, (req, res) => {
    res.json(res.tokenFound)
})

router.post('/accessToken/storage', async (req, res) => {
    const {
        access_token,
        item_id
    } = req.body;
    const token = new AccessToken({
        access_token: access_token,
        item_id: item_id
    })
    try {
        const newToken = await token.save();
        res.status(201).json(newToken)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// router.put('/accessToken/storage/:id', getToken, async (req, res) => {
router.patch('/accessToken/storage/:id', getToken, async (req, res) => {
    if (req.body.access_token != null) {
        res.tokenFound.access_token = req.body.access_token;
    }
    if (req.body.item_id != null) {
        res.tokenFound.item_id = req.body.item_id;
    }

    try {
        const updatedToken = await res.tokenFound.save();
        res.json(updatedToken)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/accessToken/storage/:id', getToken, async (req, res) => {
    try {
        await res.tokenFound.remove()
        res.json({ message: `deleted token`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;
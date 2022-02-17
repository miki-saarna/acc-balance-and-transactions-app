const AccessToken = require('../mongoDB/accessTokenSchema');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function getToken(req, res, next) {
    try {
        tokenFound = await AccessToken.findById(req.params.id)
        if (tokenFound == null) {
            return res.status(404).json({ message: `cannot find token`})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    // use res.locals.tokenFound?
    res.tokenFound = tokenFound
    next()
}

async function list(req, res) {
    try {
        const tokens = await AccessToken.find();
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ messsage: err.message})
    }
}

// create token document? within database
async function create(req, res) {
    const {
        access_token,
        item_id
    } = req.body;
    
    // unsure if await is required here
    const token = await new AccessToken({
        access_token: access_token,
        item_id: item_id
    })
    
    try {
        const newToken = await token.save();
        // console.log(process.memoryUsage().heapUsed / 1024 / 1024);
        res.status(201).json(newToken)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

async function read(req, res) {
    res.json(res.tokenFound);
}

async function update(req, res) {
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
}

async function destroy(req, res) {
    try {
        await res.tokenFound.remove()
        res.json({ message: `deleted token`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    read: [asyncErrorBoundary(getToken), read],
    update: [asyncErrorBoundary(getToken), asyncErrorBoundary(update)],
    destroy: [asyncErrorBoundary(getToken), asyncErrorBoundary(destroy)],
}
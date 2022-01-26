function errorHandler(err, req, res, next) {
    const { status = 500, message = "There is an unknown issue!" } = err;
    res.status(status).json({ error: message });
}

module.exports = errorHandler;
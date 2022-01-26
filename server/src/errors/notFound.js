function notFound(req, res, next) {
    next({ status: 404, messasge: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
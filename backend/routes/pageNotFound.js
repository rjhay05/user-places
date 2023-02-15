const HttpError = require('../model/http-error');

const pageNotFound = (req, res, next) => {
    const error = new HttpError('No Page Found', 404)
    throw error;
}

module.exports = pageNotFound;
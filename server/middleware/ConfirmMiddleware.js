const ApiError = require('../error/ApiError')
const tokenService = require('../service/TokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const confirmToken = authorizationHeader.split(' ')[1];
        if (!confirmToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateConfirmToken(confirmToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
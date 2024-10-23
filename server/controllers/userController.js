const userService = require('../service/UserService');
const ApiError = require('../error/ApiError');
const {validationResult} = require('express-validator');

class UserController {

    async createUserWithToken(req, res, next) {
        try { 
            if (!req.user) {
                return next(ApiError.Forbidden('Вы не подтвердили адрес электронной почты'))
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации пароля'))
            }
            const {id, email} = req.user
            const { password } = req.body;
            const userData = await userService.createUserWithToken(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async resetPassword(req, res, next) {
        try {
            if (!req.user) {
                return next(ApiError.Forbidden('Вы не подтвердили адрес электронной почты'))
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации пароля'))
            }
            const {id, email} = req.user
           // const { confirmToken } = req.cookies;
            const { password } = req.body;
            const userData = await userService.resetPassword(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async changeEmail(req, res, next) {
        try {
            if (!req.user) {
                return next(ApiError.Forbidden('Вы не подтвердили адрес электронной почты'))
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации почты'))
            }
            const {id, email} = req.user
           // const { confirmToken } = req.cookies;
            const { newEmail } = req.body;
            const userData = await userService.changeEmail(email, newEmail);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true })
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async recoverUserSendCode(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации почты'))
            }
            const { email } = req.body;
            const userData = await userService.recoverUserSendCode(email);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async changeEmailSendCode(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации почты'))
            }
            const { newEmail } = req.body;
            const {id, role, email} = req.user
            const userData = await userService.changeEmailSendCode(email, newEmail);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async newUserSendCode(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации почты'))
            }
            const { email } = req.body;
            const userData = await userService.newUserSendCode(email);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации почты или кода подтверждения'))
            }
            const { email, code } = req.body;
            const userData = await userService.activate( email, code);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();
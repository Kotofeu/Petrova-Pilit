const { Users, AuthValues } = require('../models/models');
const UserDto = require('../dtos/UserDto');
const bcrypt = require('bcrypt');
const mailService = require('./MailService');
const tokenService = require('./TokenService');
const ApiError = require('../error/ApiError');

class UserService {

    async createUserWithToken(email, password) {
        this.validatePassword(password);
        const user = await this.findUserByEmail(email);
        const candidateAuthValues = await AuthValues.findOne({ where: {userId: user ? user.id : null} });
        if (candidateAuthValues) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        user.role = 'USER';
        await user.save();

        const hashPassword = await this.hashPassword(password);
        const userDto = new UserDto(user);

        await AuthValues.create({ userId: userDto.id, password: hashPassword });
        const tokens = this.generateAndStoreTokens(userDto);

        return { ...tokens, user: userDto };
    }

    async resetPassword(email, newPassword) {
        this.validatePassword(newPassword);
        const user = await this.findUserByEmail(email);
        const hashPassword = await this.hashPassword(newPassword);
        const userDto = new UserDto(user);

        await this.updateAuthValues(userDto.id, hashPassword);
        await tokenService.removeAllTokens(userDto.id);

        const tokens = this.generateAndStoreTokens(userDto);

        return { ...tokens, user: userDto };
    }

    async changeEmail(email, newEmail) {
        const candidate = await this.validateEmail(newEmail);
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${newEmail} уже существует`);
        }
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            throw ApiError.NotFound(`Пользователь с почтовым адресом ${email} не существует`);
        }

        user.email = newEmail;
        await user.save();
        const userDto = new UserDto(user);
        const tokens = this.generateAndStoreTokens(userDto);
        return { ...tokens, user: userDto };

    }
    // Готово
    async recoverUserSendCode(email) {
        this.validateEmail(email);
        const user = await this.findUserByEmail(email);
        const codeConfirm = this.generateActivationCode();
        user.activateCode = codeConfirm;
        await Promise.all([
            user.save(),
            mailService.sendCodeMail(email, codeConfirm)
        ]);
        return new UserDto(user)
    }

    async changeEmailSendCode(userEmail, email) {
        const candidate = this.validateEmail(email);
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        if (!userEmail) {
            throw ApiError.UnauthorizedError();
        }
        const user = await this.findUserByEmail(userEmail);
        const codeConfirm = this.generateActivationCode();

        user.activateCode = codeConfirm;
        await Promise.all([
            user.save(),
            mailService.sendCodeMail(newEmail, codeConfirm)
        ]);
        return new UserDto(user)

    }
    // 50/50
    async newUserSendCode(email) {
        const candidate = await this.validateEmail(email);
        const candidateAuthValues = await AuthValues.findOne({ where: {userId: candidate ? candidate.id : null} });
        if (candidateAuthValues) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const codeConfirm = this.generateActivationCode();
        if (!candidate) {
            const user = await Users.create({ email, activateCode: codeConfirm });
            await mailService.sendCodeMail(email, codeConfirm);
            return new UserDto(user);
        }
        candidate.activateCode = codeConfirm;
        await Promise.all([
            candidate.save(),
            await mailService.sendCodeMail(email, codeConfirm)
        ]);
        return new UserDto(candidate);
    }

    async activate(email, code) {
        if (!email || !code) {
            throw ApiError.BadRequest('Не передана электронная почта или код подтверждения');
        }
        const user = await Users.findOne({ where: { email: email, activateCode: code } });
        if (!user) {
            throw ApiError.BadRequest('Некорректный код активации');
        }

        user.activateCode = null;
        await user.save();

        return tokenService.generateConfirmToken(user.id, user.email);
    }

    async login(email, password) {
        const user = await this.findUserByEmail(email);
        const authValues = await AuthValues.findOne({ userId: user.id });
        if (!authValues) {
            throw ApiError.BadRequest(`Пользователь не создавался (вместо входа завершите регистрацию)`);
        }
        const isPassEquals = await bcrypt.compare(password, authValues.password);
        if (!isPassEquals) {
            throw new Error('Неверный пароль');
        }
        const tokens = this.generateAndStoreTokens(user);
        const userDto = new UserDto(user);

        return { ...tokens, user: userDto };
    }


    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const { id, email } = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!id || !email || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await this.findUserByEmail(email);
        const userDto = new UserDto(user);
        const tokens = this.generateAndStoreTokens(userDto);

        return { ...tokens, user: userDto };
    }




    validateToken(confirmToken) {
        const { id, email } = tokenService.validateConfirmToken(confirmToken);
        if (!id || !email) {
            throw ApiError.BadRequest(`Почтовый адрес ${email} не подтверждён`);
        }
        return { id, email };
    }

    async findUserByEmail(email) {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            throw ApiError.NotFound(`Пользователь с почтовым адресом ${email} не существует`);
        }
        return user;
    }


    async validateEmail(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

        if (!emailRegex.test(email)) {
            throw ApiError.BadRequest(`Почта ${email} не валидна`);
        }

        const existingUser = await Users.findOne({ where: { email } })
        return existingUser
    }

    async hashPassword(password) {
        return bcrypt.hash(password, 3);
    }

    async updateAuthValues(userId, hashPassword) {
        const authValues = await AuthValues.findOne({ where: { userId } });
        if (!authValues) {
            throw ApiError.BadRequest(`Пользователь не создавался (вместо восстановления завершите регистрацию)`);
        }
        authValues.password = hashPassword;
        await authValues.save();
    }

    validatePassword(password) {
        if (password.length < 8 || /[^a-zA-Z0-9!@#$%^&*()_+=[]{};':"\/|<>?]/.test(password) || /s/.test(password)) {
            throw ApiError.BadRequest(`Пароль невалидный(менее 8 символов и имеет запрещённые символы)`);
        }
    }

    generateActivationCode() {
        return String(Math.floor(Math.random() * Math.pow(10, 6))).padStart(6, '0');
    }

    generateAndStoreTokens(userDto) {
        const tokens = tokenService.generateTokens(userDto.id, userDto.role, userDto.email);
        tokenService.createToken(userDto.id, tokens.refreshToken);
        return tokens;
    }

}

module.exports = new UserService();
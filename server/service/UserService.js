const { Users, AuthValues, Reviews, SharedImages } = require('../models/models');
const UserDto = require('../dtos/UserDto');
const bcrypt = require('bcrypt');
const mailService = require('./MailService');
const tokenService = require('./TokenService');
const ApiError = require('../error/ApiError');
const staticManagement = require('../helpers/staticManagement')
class UserService {

    async createUserWithToken(confirmToken, password) {
        this.validatePassword(password);
        const { id, email } = tokenService.validateConfirmToken(confirmToken);
        const user = await this.findUserByEmail(email);
        const candidateAuthValues = await AuthValues.findOne({ where: { userId: user ? user.id : null } });
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

    async recoverUser(confirmToken, newPassword) {
        this.validatePassword(newPassword);
        const { id, email } = tokenService.validateConfirmToken(confirmToken);
        const user = await this.findUserByEmail(email);
        const hashPassword = await this.hashPassword(newPassword);
        const userDto = new UserDto(user);

        await this.updateAuthValues(userDto.id, hashPassword);
        await tokenService.removeAllTokens(userDto.id);

        const tokens = this.generateAndStoreTokens(userDto);

        return { ...tokens, user: userDto };
    }

    async changeEmail(confirmToken, newEmail) {
        const { id, email } = tokenService.validateConfirmToken(confirmToken);
        const candidate = await this.validateEmail(newEmail);

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${newEmail} уже существует`);
        }
        const user = await this.findUserByEmail(email);


        const candidateAuth = await AuthValues.findOne({ where: { userId: user.id } });
        if (!candidateAuth) {
            throw ApiError.NotFound(`Пользователь с почтовым адресом ${email} не зарегистрирован`);
        }
        user.email = newEmail;
        await user.save();
        const userDto = new UserDto(user);
        await tokenService.removeAllTokens(userDto.id);
        const tokens = this.generateAndStoreTokens(userDto);
        return { ...tokens, user: userDto };

    }
    // Готово
    async recoverUserSendCode(email) {
        await this.validateEmail(email);
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
        const candidate = await this.validateEmail(email);
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
            mailService.sendCodeMail(email, codeConfirm)
        ]);
        return new UserDto(user)

    }
    // 50/50
    async newUserSendCode(email) {
        const candidate = await this.validateEmail(email);
        const candidateAuthValues = await AuthValues.findOne({ where: { userId: candidate ? candidate.id : null } });
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
        const authValues = await AuthValues.findOne({ where: { userId: user.id } });
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
        const { id, role } = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!id || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await this.findUserById(id);

        const userDto = new UserDto(user);
        const tokens = this.generateAndStoreTokens(userDto, tokenFromDb.id);

        return { ...tokens, user: userDto };
    }

    async getUser(id, refreshToken) {
        if (!refreshToken || !id) {
            throw ApiError.UnauthorizedError();
        }
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await this.findUserById(id);
        const userDto = new UserDto(user);
        const tokens = this.generateAndStoreTokens(userDto, tokenFromDb.id);
        return { ...tokens, user: userDto };
    }


    async giveRole(id, role) {
        if (!role || !id) {
            throw ApiError.BadRequest('Не указаны id и/или новая роль пользователя');
        }
        const user = await this.findUserById(id);

        user.role = role
        await user.save()
        return new UserDto(user)
    }

    async changeById(id, userDto, image) {
        const userValues = new UserDto(userDto);
        if (!id) {
            throw ApiError.BadRequest('Не указан id пользователя');
        }
        const user = await this.findUserById(id);

        Object.keys(userValues).forEach(key => {
            if (userValues[key]) {
                user[key] = userValues[key];
            }
        });

        if (image) {
            const fileName = await staticManagement.staticCreate(image);
            await staticManagement.staticDelete(user.imageSrc);
            user.imageSrc = fileName;
        }
        await user.save()
        return new UserDto(user)
    }

    async changeImage(id, image) {
        if (!id) {
            throw ApiError.BadRequest('Не указан id пользователя');
        }
        const user = await this.findUserById(id);

        await staticManagement.staticDelete(user.imageSrc);
        if (image) {
            const fileName = await staticManagement.staticCreate(image);
            user.imageSrc = fileName;
        }
        else {
            user.imageSrc = null
        }
        await user.save()
        return new UserDto(user)
    }

    async changeName(id, name) {
        if (!id) {
            throw ApiError.BadRequest('Не указан id пользователя');
        }
        const user = await this.findUserById(id);

        user.name = name || null
        await user.save()
        return new UserDto(user)
    }
    async changePhone(id, phone) {
        if (!id) {
            throw ApiError.BadRequest('Не указан id пользователя');
        }
        const user = await this.findUserById(id);

        user.phone = phone || null
        await user.save()
        return new UserDto(user)
    }

    async getAllUsers() {
        const users = await Users.findAndCountAll();
        return users;
    }
    async getUserById(id) {
        if (!id) {
            throw ApiError.BadRequest('Не указан id пользователя');
        }
        const user = await this.findUserById(id);

        return new UserDto(user)
    }

    async deleteUser(id) {
        if (!id) {
            return next(ApiError.UnauthorizedError())
        }
        const candidate = await Users.findOne({ where: { id } });
        if (!candidate) {
            return null
        }
        await staticManagement.staticDelete(candidate.imageSrc);
        const user = await Users.destroy({ where: { id } });
        tokenService.removeAllTokens(id)
        return user
    }

    validateToken(confirmToken) {
        const { id, email } = tokenService.validateConfirmToken(confirmToken);
        if (!id || !email) {
            throw ApiError.BadRequest(`Почтовый адрес ${email} не подтверждён`);
        }
        return { id, email };
    }
    async findUserById(id) {

        const user = await Users.findOne({
            where: { id },
            include: [{
                model: Reviews,
                attributes: ['id', 'comment', 'rating'],
                include: [{
                    model: SharedImages,
                    through: {
                        attributes: []
                    },
                    attributes: ['id', 'name', 'imageSrc']
                }],
            }],
            attributes: ['id', 'name', 'imageSrc', 'visitsNumber', 'email', 'phone', 'role']
        });

        if (!user) {
            throw ApiError.NotFound(`Пользователь с id ${id} не существует`);
        }
        return user;
    }

    async findUserByEmail(email) {

        const user = await Users.findOne({
            where: { email },
            include: [{
                model: Reviews,
                attributes: ['id', 'comment', 'rating'],
                include: [{
                    model: SharedImages,
                    through: {
                        attributes: []
                    },
                    attributes: ['id', 'name', 'imageSrc']
                }],
            }],
            attributes: ['id', 'name', 'imageSrc', 'visitsNumber', 'email', 'phone', 'role']
        });

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

    generateAndStoreTokens(userDto, tokenId) {
        const tokens = tokenService.generateTokens(userDto.id, userDto.role, userDto.email);
        if (!tokenId) {
            tokenService.createToken(userDto.id, tokens.refreshToken);
        }
        else {
            tokenService.saveToken(tokenId, tokens.refreshToken);
        }
        return tokens;
    }

}

module.exports = new UserService();
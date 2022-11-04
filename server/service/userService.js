const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDto");
const ApiError = require("../exceptions/apiError");

class UserService {
  /**
   * Фукнция возвращающая информацию о пользователе с необходимыми токенами
   * @param {Object} user Запись из БД
   * @returns {Object} Информация о пользователе с необходимыми токенами
   */
  async getUserDtoWithTokens(user) {
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async signUp(newUser) {
    const { email, password, firstName, lastName, birthDate, gender } = newUser;

    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует!`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email: newUser.email,
      password: hashedPassword,
      activationLink,
      firstName,
      lastName,
      birthDate,
      gender,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    return await this.getUserDtoWithTokens(user);
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    console.log(user);

    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    return await this.getUserDtoWithTokens(user);
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    return await this.getUserDtoWithTokens(user);
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();

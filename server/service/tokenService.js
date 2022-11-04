const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: `${process.env.ACCESS_TOKEN_MAX_AGE}ms`,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: `${process.env.REFRESH_TOKEN_MAX_AGE}ms`,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Функция проверки access токена
   * (Возможно в будущем стоит добавить
   * выбрасывание исключения вместо возвращения null)
   * @param {String} token access токен
   * @returns {Object|Null} Результат проверки
   */
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * Функция проверки refresh токена
   * (Возможно в будущем стоит добавить
   * выбрасывание исключения вместо возвращения null)
   * @param {String} token refresh токен
   * @returns {Object|Null} Результат проверки
   */
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * Тут проблема с тем что пользователь может
   * быть авторизован только с устройства
   * можно переделать на несколько, для этого нужно
   * хранить множество токенов
   */
  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  /**
   * Поиск refresh токена в базе
   * @param {String} refreshToken refresh токен
   * @returns {Object} Данные о токене
   */
  async findRefreshToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();

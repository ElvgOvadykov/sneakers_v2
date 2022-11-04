const userService = require("../service/userService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");

class UserController {
  async signUp(request, response, next) {
    try {
      // const errors = validationResult(request);
      // if (!errors.isEmpty()) {
      //   return next(
      //     ApiError.BadRequest("Ошибка при валидации", errors.array())
      //   );
      // }

      const { newUser } = request.body;
      const userData = await userService.signUp(newUser);

      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: process.env.REFRESH_TOKEN_MAX_AGE,
        httpOnly: true,
      });
      response.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(request, response, next) {
    try {
      const { email, password } = request.body;
      const userData = await userService.login(email, password);

      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: process.env.REFRESH_TOKEN_MAX_AGE,
        httpOnly: true,
      });
      response.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const token = await userService.logout(refreshToken);
      response.clearCookie("refreshToken");
      return response.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(request, response, next) {
    try {
      const activationLink = request.params.link;
      console.log(activationLink);
      await userService.activate(activationLink);
      return response.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(request, response, next) {
    try {
      const { refreshToken } = request.cookies;
      const userData = await userService.refresh(refreshToken);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: process.env.REFRESH_TOKEN_MAX_AGE,
        httpOnly: true,
      });
      response.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(request, response, next) {
    try {
      const users = await userService.getAllUsers();
      return response.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();

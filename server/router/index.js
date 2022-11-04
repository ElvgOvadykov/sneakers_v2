const Router = require("express").Router;
const UserController = require("../controllers/userController");
const SneakersController = require("../controllers/sneakersController");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

// Поправить валидацию после переработки модели пользователя
router.post(
  "/sign-up",
  // body("email").isEmail(),
  // body("password").isLength({ min: 3, max: 32 }),
  UserController.signUp
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);

/**
 * Кроссовки
 */

/**
 * Получение постраничного списка кроссовок
 */
router.get("/sneakers", SneakersController.getPagedList);

/**
 * Добавление новых крассовок
 */
router.post("/sneakers", SneakersController.addSneakers);

module.exports = router;

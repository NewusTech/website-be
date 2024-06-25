const userController = require("../controllers/user.controller");

const mid = require("../middlewares/auth.middleware");

const express = require("express");
const route = express.Router();

route.post("/admin/register", userController.createUser);
route.post("/admin/login", userController.loginUser);
route.post("/admin/logout", [mid.isLogin, mid.isLogout], userController.logoutUser);

module.exports = route;

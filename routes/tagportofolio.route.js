const tagportofolioController = require("../controllers/tagportofolio.controller");

const mid = require("../middlewares/auth.middleware");
const express = require("express");
const route = express.Router();

route.post("/admin/tagportofolio/create", [mid.isLogin, mid.isLogout], tagportofolioController.createtagportofolio);
route.get("/admin/tagportofolio/get", [mid.isLogin, mid.isLogout], tagportofolioController.gettagportofolio);
route.get("/admin/tagportofolio/get/:id", [mid.isLogin, mid.isLogout], tagportofolioController.gettagportofolioById);
route.put("/admin/tagportofolio/update/:id", [mid.isLogin, mid.isLogout], tagportofolioController.updatetagportofolio);
route.delete("/admin/tagportofolio/delete/:id", [mid.isLogin, mid.isLogout], tagportofolioController.deletetagportofolio);

module.exports = route;

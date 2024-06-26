const kategoriportofolioController = require("../controllers/kategoriportofolio.controller");

const mid = require("../middlewares/auth.middleware");

const express = require("express");
const route = express.Router();

route.post("/admin/kategoriportofolio/create", [mid.isLogin, mid.isLogout], kategoriportofolioController.createkategoriportofolio);
route.get("/admin/kategoriportofolio/get", kategoriportofolioController.getkategoriportofolio);
route.get("/admin/kategoriportofolio/get/:id", kategoriportofolioController.getkategoriportofolioById);
route.put("/admin/kategoriportofolio/update/:id", [mid.isLogin, mid.isLogout], kategoriportofolioController.updatekategoriportofolio); 
route.delete("/admin/kategoriportofolio/delete/:id", [mid.isLogin, mid.isLogout], kategoriportofolioController.deletekategoriportofolio);

module.exports = route;

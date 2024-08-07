const multer = require("multer");
const {
  portfolioLists,
  newPortfolio,
  portfolioDetail,
  deletePortfolio,
  updatePortfolio,
} = require("../controllers/portfolio.controller");

const mid = require("../middlewares/auth.middleware");

const route = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get("/admin/portfolio/lists", portfolioLists);
route.post("/admin/portfolio/new", [mid.isLogin, mid.isLogout], upload.fields([{ name: 'image', maxCount: 1 }, { name: 'logo', maxCount: 1 }, { name: 'galeri', maxCount: 10 }]), newPortfolio);
route.get("/admin/:slug/portfolio/detail", portfolioDetail);
route.delete("/admin/:id/portfolio/deleted", deletePortfolio);
route.put("/admin/:id/portfolio/update", [mid.isLogin, mid.isLogout], upload.fields([{ name: 'image', maxCount: 1 }, { name: 'logo', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), updatePortfolio);

module.exports = route;

const {
  getaboutCompany,
  addAboutCompany,
  deleteAboutCompany,
  updateAboutCompany,
} = require("../controllers/aboutCompany.controller");

const router = require("express").Router();
const mid = require('../middlewares/auth.middleware');

router.get("/admin/aboutcompany/get", [mid.isLogin, mid.isLogout], getaboutCompany);
router.post("/admin/aboutcompany/create", [mid.isLogin, mid.isLogout], addAboutCompany);
router.delete("/admin/:id/aboutcompany/delete", [mid.isLogin, mid.isLogout], deleteAboutCompany);
router.put("/admin/:id/aboutcompany/update", [mid.isLogin, mid.isLogout], updateAboutCompany);

module.exports = router;

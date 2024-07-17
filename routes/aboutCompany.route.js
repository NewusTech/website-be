const {
  getaboutCompany,
  addAboutCompany,
  deleteAboutCompany,
  updateAboutCompany,
  aboutCompanyDetails,
} = require("../controllers/aboutCompany.controller");

const multer = require("multer");
const router = require("express").Router();
const mid = require('../middlewares/auth.middleware');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/aboutcompany/get", getaboutCompany);
router.post("/admin/aboutcompany/create", [mid.isLogin, mid.isLogout], upload.fields([{ name: 'siteLogo', maxCount: 1 }, { name: 'footerLogo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), addAboutCompany);
router.delete("/admin/:id/aboutcompany/delete", [mid.isLogin, mid.isLogout], deleteAboutCompany);
router.put("/admin/:id/aboutcompany/update", [mid.isLogin, mid.isLogout], upload.fields([{ name: 'siteLogo', maxCount: 1 }, { name: 'footerLogo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), updateAboutCompany);
router.get("/admin/:id/aboutcompany/detail", aboutCompanyDetails);

module.exports = router;

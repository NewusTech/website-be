const multer = require("multer");
const {
  seoLists,
  newSeo,
  seoDetails,
  deleteSeo,
  updateSeo,
} = require("../controllers/seo.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const mid = require('../middlewares/auth.middleware');

router.get("/admin/seo/lists", seoLists);
router.post("/admin/seo/new-seo", newSeo);
router.get("/admin/:id/seo/detail", seoDetails);
router.delete("/admin/:id/seo/delete", deleteSeo);
router.put("/admin/:id/seo/update", [mid.isLogin, mid.isLogout], updateSeo);

module.exports = router;

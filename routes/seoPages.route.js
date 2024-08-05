const multer = require("multer");
const {
  seoPageLists,
  newSeoPages,
  seoPageDetails,
  deleteSeoPages,
  updateSeoPages,
} = require("../controllers/seoPages.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const mid = require('../middlewares/auth.middleware');
const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/seo/pages/lists", seoPageLists);
router.post("/admin/seo/pages/new-seo", upload.single('metaImage'), newSeoPages);
router.get("/admin/:id/seo/pages/detail", seoPageDetails);
router.delete("/admin/:id/seo/pages/delete", deleteSeoPages);
router.put("/admin/:id/seo/pages/update", [mid.isLogin, mid.isLogout], upload.single('metaImage'), updateSeoPages);

module.exports = router;

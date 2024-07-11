const multer = require("multer");
const {
  whyUsLists,
  newWhyUs,
  whyUsDetails,
  deleteWhyUs,
  updateWhyUs,
} = require("../controllers/whyUs.controller");

const router = require("express").Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const mid = require('../middlewares/auth.middleware');

router.get("/admin/whyus/lists", whyUsLists);
router.post("/admin/whyus/create", [mid.isLogin, mid.isLogout], upload.single("image"), newWhyUs);
router.get("/admin/:id/whyus/detail", whyUsDetails);
router.delete("/admin/:id/whyus/delete", [mid.isLogin, mid.isLogout], deleteWhyUs);
router.put("/admin/:id/whyus/update", [mid.isLogin, mid.isLogout], upload.single("image"), updateWhyUs);

module.exports = router;

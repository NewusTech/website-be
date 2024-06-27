const {
  socialMediaLists,
  socialMediaDetail,
  newSocialMedia,
  deleteSocialMedia,
  updateSocialMedia,
} = require("../controllers/socialMedia.controller");

const router = require("express").Router();
const mid = require('../middlewares/auth.middleware');

router.get("/admin/socialmedia/get", socialMediaLists);
router.post("/admin/socialmedia/create", [mid.isLogin, mid.isLogout], newSocialMedia);
router.get("/admin/:id/socialmedia/detail", socialMediaDetail);
router.delete("/admin/:id/socialmedia/delete", [mid.isLogin, mid.isLogout], deleteSocialMedia);
router.put("/admin/:id/socialmedia/update", [mid.isLogin, mid.isLogout], updateSocialMedia);

module.exports = router;

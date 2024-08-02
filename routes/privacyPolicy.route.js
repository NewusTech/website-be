const multer = require("multer");
const {
  privacypolicyLists,
  newPrivacyPolicy,
  privacypolicyDetails,
  deletePrivacyPolicy,
  updatePrivacyPolicy,
} = require("../controllers/privacyPolicy.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();

router.get("/admin/privacy/policy/lists", privacypolicyLists);
router.post("/admin/privacy/policy/new", newPrivacyPolicy);
router.get("/admin/:id/privacy/policy/detail", privacypolicyDetails);
router.delete("/admin/:id/privacy/policy/delete", deletePrivacyPolicy);
router.put("/admin/:id/privacy/policy/update", updatePrivacyPolicy);

module.exports = router;

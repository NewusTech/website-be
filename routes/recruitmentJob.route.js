const {
  jobRecruitmentLists,
  newJobRecruitment,
  jobRecruitmentDetail,
  deleteJobRecruitment,
  updateJobRecruitment,
} = require("../controllers/jobRecruitment.controller");

const multer = require("multer");
const router = require("express").Router();
const mid = require("../middlewares/auth.middleware");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/jobrecruitment/lists", jobRecruitmentLists);
router.post("/admin/jobrecruitment/new-job", [mid.isLogin, mid.isLogout], upload.single('coverLetter'), newJobRecruitment);
router.get("/admin/:id/jobrecruitment/detail", jobRecruitmentDetail);
router.delete("/admin/:id/jobrecruitment/delete", [mid.isLogin, mid.isLogout], deleteJobRecruitment);
router.put("/admin/:id/jobrecruitment/update", [mid.isLogin, mid.isLogout], updateJobRecruitment);

module.exports = router;

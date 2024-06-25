const {
  jobRecruitmentLists,
  newJobRecruitment,
  jobRecruitmentDetail,
  deleteJobRecruitment,
  updateJobRecruitment,
} = require("../controllers/jobRecruitment.controller");

const router = require("express").Router();
const mid = require("../middlewares/auth.middleware");

router.get("/admin/jobrecruitment/lists", [mid.isLogin, mid.isLogout], jobRecruitmentLists);
router.post("/admin/jobrecruitment/new-job", [mid.isLogin, mid.isLogout], newJobRecruitment);
router.get("/admin/:id/jobrecruitment/detail", [mid.isLogin, mid.isLogout], jobRecruitmentDetail);
router.delete("/admin/:id/jobrecruitment/delete", [mid.isLogin, mid.isLogout], deleteJobRecruitment);
router.put("/admin/:id/jobrecruitment/update", [mid.isLogin, mid.isLogout], updateJobRecruitment);

module.exports = router;

const {
  internRecruitmentLists,
  createInternRecruitment,
  internRecruitmentDetail,
  deleteInternRecruitment,
  updateInternRecruitment,
} = require("../controllers/internRecruitment.controller");

const router = require("express").Router();

router.get("/admin/internrecruitment/get", internRecruitmentLists);
router.post("/admin/internrecruitment/create", createInternRecruitment);
router.get("/admin/:id/internrecruitment/detail", internRecruitmentDetail);
router.delete("/admin/:id/internrecruitment/delete", deleteInternRecruitment);
router.put("/admin/:id/internrecruitment/update", updateInternRecruitment);

module.exports = router;

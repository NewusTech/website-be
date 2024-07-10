const {
  internRecruitmentLists,
  createInternRecruitment,
  internRecruitmentDetail,
  deleteInternRecruitment,
  updateInternRecruitment,
} = require("../controllers/internRecruitment.controller");

const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/internrecruitment/get", internRecruitmentLists);
router.post("/admin/internrecruitment/create", upload.single('coverLetter'), createInternRecruitment);
router.get("/admin/:id/internrecruitment/detail", internRecruitmentDetail);
router.delete("/admin/:id/internrecruitment/delete", deleteInternRecruitment);
router.put("/admin/:id/internrecruitment/update", updateInternRecruitment);

module.exports = router;

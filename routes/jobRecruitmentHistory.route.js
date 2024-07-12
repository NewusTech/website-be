const multer = require("multer");
const {
  jobRecruitmentHistoryLists,
  createJobRecruitmentHistory,
  jobRecruitmentHistoryDetails,
  deleteJobRecruitmentHistory,
  updateJobRecruitmentHistory,
} = require("../controllers/jobRecruitmentHistory");

const router = require("express").Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/jobrecruitmenthistory/lists", jobRecruitmentHistoryLists);
router.post("/admin/jobrecruitmenthistory/create", upload.fields([{ name: 'coverLetter', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), createJobRecruitmentHistory);
router.get(
  "/admin/:id/jobrecruitmenthistory/detail",
  jobRecruitmentHistoryDetails
);
router.delete(
  "/admin/:id/jobrecruitmenthistory/delete",
  deleteJobRecruitmentHistory
);
router.put(
  "/admin/:id/jobrecruitmenthistory/update",
  updateJobRecruitmentHistory
);

module.exports = router;

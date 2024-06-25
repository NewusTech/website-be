const {
  jobRecruitmentHistoryLists,
  createJobRecruitmentHistory,
  jobRecruitmentHistoryDetails,
  deleteJobRecruitmentHistory,
  updateJobRecruitmentHistory,
} = require("../controllers/jobRecruitmentHistory");

const router = require("express").Router();

router.get("/admin/jobrecruitmenthistory/lists", jobRecruitmentHistoryLists);
router.post("/admin/jobrecruitmenthistory/create", createJobRecruitmentHistory);
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

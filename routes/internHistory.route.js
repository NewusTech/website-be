const {
  internHistoryLists,
  createInternHistory,
  internHistoryDetail,
  deleteInternHistory,
  updateInternHistory,
} = require("../controllers/internHistory.controller");

const router = require("express").Router();

router.get("/admin/internhistory/lists", internHistoryLists);
router.post("/admin/internhistory/new-history", createInternHistory);
router.get("/admin/:id/internhistory/detail", internHistoryDetail);
router.delete("/admin/:id/internhistory/delete", deleteInternHistory);
router.put("/admin/:id/internhistory/update", updateInternHistory);

module.exports = router;

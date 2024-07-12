const multer = require("multer");
const {
  internHistoryLists,
  createInternHistory,
  internHistoryDetail,
  deleteInternHistory,
  updateInternHistory,
} = require("../controllers/internHistory.controller");

const router = require("express").Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/internhistory/lists", internHistoryLists);
router.post("/admin/internhistory/new-history", upload.fields([{ name: 'applicationLetter', maxCount: 1 }]), createInternHistory);
router.get("/admin/:id/internhistory/detail", internHistoryDetail);
router.delete("/admin/:id/internhistory/delete", deleteInternHistory);
router.put("/admin/:id/internhistory/update", updateInternHistory);

module.exports = router;

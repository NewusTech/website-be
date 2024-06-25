const {
  messageHistoryLists,
  createMessageHistory,
  messageHistoryDetails,
  deleteMessageHistory,
  updateMessageHistory,
} = require("../controllers/messageHistory.controller");

const router = require("express").Router();

router.get("/admin/messagehistory/lists", messageHistoryLists);
router.post("/admin/messagehistory/new-message", createMessageHistory);
router.get("/admin/:id/messagehistory/detail", messageHistoryDetails);
router.delete("admin/:id/messagehistory/delete", deleteMessageHistory);
router.put("/admin/:id/mesagehistory/update", updateMessageHistory);

module.exports = router;

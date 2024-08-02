const multer = require("multer");
const {
  termconditionLists,
  newTermCondition,
  termconditionDetails,
  deleteTermCondition,
  updateTermCondition,
} = require("../controllers/termCondition.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/tnc/lists", termconditionLists);
router.post("/admin/tnc/new-tnc", newTermCondition);
router.get("/admin/:id/tnc/detail", termconditionDetails);
router.delete("/admin/:id/tnc/delete", deleteTermCondition);
router.put("/admin/:id/tnc/update", updateTermCondition);

module.exports = router;

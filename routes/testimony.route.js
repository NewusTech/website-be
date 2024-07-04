const multer = require("multer");
const {
  testimonyLists,
  newTestimony,
  testimonyDetails,
  deleteTestimony,
  updateTestimony,
} = require("../controllers/testimony.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/testimony/lists", testimonyLists);
router.post("/admin/testimony/new-testimony", upload.single("image"), newTestimony);
router.get("/admin/:id/testimony/detail", testimonyDetails);
router.delete("/admin/:id/testimony/delete", deleteTestimony);
router.put("/admin/:id/testimony/update", upload.single("image"), updateTestimony);

module.exports = router;

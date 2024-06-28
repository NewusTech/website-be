const multer = require("multer");
const {
  mediaLists,
  newMedia,
  mediaDetails,
  deleteMedia,
  updateMedia,
} = require("../controllers/media.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/media/lists", mediaLists);
router.post("/admin/media/new-media", upload.single("image"), newMedia);
router.get("/admin/:id/media/detail", mediaDetails);
router.delete("/admin/:id/media/delete", deleteMedia);
router.put("/admin/:id/media/update", upload.single("image"), updateMedia);

module.exports = router;

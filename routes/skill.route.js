const multer = require("multer");
const {
  skillLists,
  newSkill,
  skillDetails,
  deleteSkill,
  updateSkill,
} = require("../controllers/skill.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/skill/lists", skillLists);
router.post("/admin/skill/new-skill", upload.single("image"), newSkill);
router.get("/admin/:id/skill/detail", skillDetails);
router.delete("/admin/:id/skill/delete", deleteSkill);
router.put("/admin/:id/skill/update", upload.single("image"), updateSkill);

module.exports = router;

const multer = require("multer");
const {
  teamLists,
  newTeam,
  teamDetails,
  deleteTeam,
  updateTeam,
} = require("../controllers/team.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/team/lists", teamLists);
router.post("/admin/team/new-team", upload.single("image"), newTeam);
router.get("/admin/:id/team/detail", teamDetails);
router.delete("/admin/:id/team/delete", deleteTeam);
router.put("/admin/:id/team/update", upload.single("image"), updateTeam);

module.exports = router;

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
router.post('/admin/team/new-team', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'achievement', maxCount: 1 }]), newTeam);
router.get("/admin/:id/team/detail", teamDetails);
router.delete("/admin/:id/team/delete", deleteTeam);
router.put("/admin/:id/team/update", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'achievement', maxCount: 1 }]), updateTeam);

module.exports = router;

const multer = require("multer");
const {
  teamLists,
  newTeam,
  teamDetails,
  getTeamBySlug,
  deleteTeam,
  updateTeam,
} = require("../controllers/team.controller");

const router = require("express").Router();
const storage = multer.memoryStorage();
const mid = require('../middlewares/auth.middleware');
const upload = multer({ storage: storage });

router.get("/admin/team/lists", teamLists);
router.post('/admin/team/new-team', upload.any(), newTeam);
router.get("/admin/:id/team/detail", teamDetails);
router.get("/admin/team/:slug", getTeamBySlug);
router.delete("/admin/:id/team/delete", deleteTeam);
router.put("/admin/:id/team/update", [mid.isLogin, mid.isLogout], upload.fields([{ name: 'image', maxCount: 1 }]), updateTeam);

module.exports = router;

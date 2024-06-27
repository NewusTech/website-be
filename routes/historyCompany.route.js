const multer = require("multer");
const {
  getHistoryCompany,
  addHistoryCompany,
  deleteHistoryCompany,
  updateHistoryCompany,
} = require("../controllers/historyCompany.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mid = require('../middlewares/auth.middleware');

router.get("/admin/historycompany/list",  getHistoryCompany);
router.post("/admin/historycompany/create", [mid.isLogin, mid.isLogout], upload.single("image"), [mid.isLogin, mid.isLogout], addHistoryCompany);
router.delete("/admin/:id/historycompany/delete", [mid.isLogin, mid.isLogout], deleteHistoryCompany);
router.put("/admin/:id/historycompany/update", [mid.isLogin, mid.isLogout], upload.single("image"), updateHistoryCompany);

module.exports = router;

const multer = require("multer");
const {
  bannerLists,
  createBanner,
  bannerDetails,
  deleteBanner,
  updateBanner,
} = require("../controllers/banner.controller");

const router = require("express").Router();

// Konfigurasi Multer untuk mengunggah file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Tambahkan rute untuk membuat banner baru
router.get("/admin/banner/get", bannerLists);
router.post("/admin/banner/create", upload.single("image"), createBanner);
router.get("/admin/:id/banner/detail", bannerDetails);
router.delete("/admin/:id/banner/delete", deleteBanner);
router.put("/admin/:id/banner/update", upload.single("image"), updateBanner);

module.exports = router;

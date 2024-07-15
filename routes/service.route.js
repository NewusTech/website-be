const multer = require("multer");
const {
  serviceLists,
  createService,
  serviceDetail,
  deleteService,
  updateService,
} = require("../controllers/service.controller");

const router = require("express").Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/service/get", serviceLists);
router.post("/admin/service/create", upload.single("image"), createService);
router.get("/admin/:id/service/detail", serviceDetail);
router.delete("/admin/:id/service/delete", deleteService);
router.put("/admin/:id/service/update", upload.single("image"), updateService);

module.exports = router;

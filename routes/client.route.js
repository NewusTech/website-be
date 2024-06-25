const multer = require("multer");
const {
  clientLists,
  createClient,
  clientDetails,
  deleteClient,
  updateClient,
} = require("../controllers/client.controller");

const router = require("express").Router();

router.get("/admin/client/get", clientLists);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/admin/client/create", upload.single("image"), createClient);
router.get("/admin/:id/client/detail", clientDetails);
router.delete("/admin/:id/client/delete", deleteClient);
router.put("/admin/:id/client/update", upload.single("image"), updateClient);

module.exports = router;

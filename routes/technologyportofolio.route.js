const multer = require("multer");
const {
  technologyportofolioLists,
  newTechnologyPortofolio,
  technologyportofolioDetails,
  deleteTechnologyPortofolio,
  updateTechnologyPortofolio,
} = require("../controllers/technologyportofolio.controller");

const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/admin/technology/lists", technologyportofolioLists);
router.post("/admin/technology/new-technology", upload.single("image"), newTechnologyPortofolio);
router.get("/admin/:id/technology/detail", technologyportofolioDetails);
router.delete("/admin/:id/technology/delete", deleteTechnologyPortofolio);
router.put("/admin/:id/technology/update", upload.single("image"), updateTechnologyPortofolio);

module.exports = router;

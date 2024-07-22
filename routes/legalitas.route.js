const {
    legalitasLists,
    createLegalitas,
    legalitasDetail,
    deleteLegalitas,
    updateLegalitas,
  } = require("../controllers/legalitas.controller");
  
  const router = require("express").Router();
  const multer = require("multer");
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  
  router.get("/admin/legalitas/get", legalitasLists);
  router.post("/admin/legalitas/create", upload.fields([{ name: 'companyProfile', maxCount: 1 }, { name: 'aktaPendirian', maxCount: 1 }, { name: 'suratPengesahan', maxCount: 1 }, { name: 'sertifikasi', maxCount: 1 }, { name: 'bidangUsaha', maxCount: 1 }, { name: 'npwp', maxCount: 1 }]), createLegalitas);
  router.get("/admin/:id/legalitas/detail", legalitasDetail);
  router.delete("/admin/:id/legalitas/delete", deleteLegalitas);
  router.put("/admin/:id/legalitas/update", upload.fields([{ name: 'companyProfile', maxCount: 1 }, { name: 'aktaPendirian', maxCount: 1 }, { name: 'suratPengesahan', maxCount: 1 }, { name: 'sertifikasi', maxCount: 1 }, { name: 'bidangUsaha', maxCount: 1 }, { name: 'npwp', maxCount: 1 }]), updateLegalitas);
  
  module.exports = router;
  
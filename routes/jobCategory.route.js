const {
    jobCategoryLists,
    newJobCategory,
    jobCategoryDetail,
    deleteJobCategory,
    updateJobCategory,
  } = require("../controllers/jobCategory.controller");
  
  const router = require("express").Router();
  const mid = require('../middlewares/auth.middleware');
  
  router.get("/admin/jobcategory/lists", [mid.isLogin, mid.isLogout], jobCategoryLists);
  router.post("/admin/jobcategory/create", [mid.isLogin, mid.isLogout], newJobCategory);
  router.get("/admin/:id/jobcategory/detail", [mid.isLogin, mid.isLogout], jobCategoryDetail);
  router.delete("/admin/:id/jobcategory/delete", [mid.isLogin, mid.isLogout], deleteJobCategory);
  router.put("/admin/:id/jobcategory/update", [mid.isLogin, mid.isLogout], updateJobCategory);
  
  module.exports = router;
  
const {
  divitionCategoryLists,
  newDivitionCategory,
  divitionCategoryDetails,
  deleteDivitionCategory,
  updateDivitionCategory,
} = require("../controllers/divitionCategory.controller");

const router = require("express").Router();
const mid = require('../middlewares/auth.middleware');

router.get("/admin/divitioncategory/lists", divitionCategoryLists);
router.post("/admin/divitioncategory/category", [mid.isLogin, mid.isLogout], newDivitionCategory);
router.get("/admin/:id/divitioncategory/detail", divitionCategoryDetails);
router.delete("/admin/:id/divitioncategory/delete", [mid.isLogin, mid.isLogout], deleteDivitionCategory);
router.put("/admin/:id/divitioncategory/update", [mid.isLogin, mid.isLogout], updateDivitionCategory);

module.exports = router;

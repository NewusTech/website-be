const { DivitionCategory } = require("../models/index");

class DivitionCategoryController {
  static async divitionCategoryLists(req, res, next) {
    try {
      const divitionCategories = await DivitionCategory.findAll();

      res.status(200).json({
        message: "Success get divition categories",
        data: divitionCategories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async divitionCategoryDetails(req, res, next) {
    try {
      const { id } = req.params;

      const divitionCategory = await DivitionCategory.findByPk(id);

      if (!divitionCategory) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get divition category",
        data: divitionCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async newDivitionCategory(req, res, next) {
    try {
      const { title } = req.body;

      const newDivitionCategory = await DivitionCategory.create({ title });

      res.status(201).json({
        message: "Success create divition category",
        data: newDivitionCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteDivitionCategory(req, res, next) {
    try {
      const { id } = req.params;

      const divitionCategory = await DivitionCategory.findByPk(id);

      if (!divitionCategory) throw { name: "InvalidId" };

      await divitionCategory.destroy();

      res.status(200).json({
        message: "Success delete divition category",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateDivitionCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const divitionCategory = await DivitionCategory.findByPk(id);

      if (!divitionCategory) throw { name: "InvalidId" };

      await divitionCategory.update({ title });

      res.status(200).json({
        message: "Success update divition category",
        data: divitionCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = DivitionCategoryController;

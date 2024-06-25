const { JobCategory } = require("../models/index");

class JobCategoryController {
  // method for getting job category lists
  static async jobCategoryLists(req, res, next) {
    try {
      const jobCategories = await JobCategory.findAll();

      res.status(200).json({
        message: "Success getting job category lists",
        data: jobCategories,
      });
    } catch {
      console.log(error);
      next(error);
    }
  }

  // method for creating job category
  static async newJobCategory(req, res, next) {
    try {
      // req body for getting value
      const { title } = req.body;

      // method for creating new job category
      const jobCategory = await JobCategory.create({ title });

      res.status(201).json({
        message: "Success creating new job category",
        data: jobCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // method fot getting job category detail
  static async jobCategoryDetail(req, res, next) {
    try {
      const { id } = req.params;

      // method for getting job category detail
      const jobCategory = await JobCategory.findByPk(id);

      // validation if job category not found
      if (!jobCategory) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success getting job category detail",
        data: jobCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteJobCategory(req, res, next) {
    try {
      const { id } = req.params;

      // method to check data from db
      const jobCategory = await JobCategory.findByPk(id);

      // validation if job category not found
      if (!jobCategory) throw { name: "InvalidId" };

      await jobCategory.destroy();

      res.status(200).json({
        message: "Success deleting job category",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateJobCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      // method to check data from db
      const jobCategory = await JobCategory.findByPk(id);

      // validation if job category not found
      if (!jobCategory) throw { name: "InvalidId" };

      await jobCategory.update({ title });

      res.status(200).json({
        message: "Success updating job category",
        data: jobCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = JobCategoryController;

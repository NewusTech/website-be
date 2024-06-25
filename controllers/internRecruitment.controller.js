const { InternRecruitment } = require("../models/index");

class InterRecruitmentController {
  static async internRecruitmentLists(req, res, next) {
    try {
      const intern = await InternRecruitment.findAll();

      res.status(200).json({
        message: "success get internRecruitment",
        data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async internRecruitmentDetail(req, res, next) {
    try {
      const { id } = req.params;

      const intern = await InternRecruitment.findByPk(id);

      if (!intern) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get internRecruitment detail",
        data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createInternRecruitment(req, res, next) {
    try {
      const { description, coverLetter } = req.body;

      const intern = await InternRecruitment.create({
        description,
        coverLetter,
      });

      res.status(201).json({
        message: "success create internRecruitment",
        data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteInternRecruitment(req, res, next) {
    try {
      const { id } = req.params;

      const intern = await InternRecruitment.findByPk(id);

      if (!intern) throw { name: "InvalidId" };

      await intern.destroy();

      res.status(200).json({
        message: "success delete internRecruitment",
        // data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateInternRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const { description, coverLetter } = req.body;

      const intern = await InternRecruitment.findByPk(id);

      if (!intern) throw { name: "InvalidId" };

      await intern.update({ description, coverLetter });

      res.status(200).json({
        message: "success update internRecruitment",
        data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = InterRecruitmentController;

const { JobRecruitmentHistory } = require("../models/index");

class JobRecruitmentHistoryController {
  static async jobRecruitmentHistoryLists(req, res, next) {
    try {
      const histories = await JobRecruitmentHistory.findAll();

      res.status(200).json({
        message: "success get job recruitment history lists",
        data: histories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async jobRecruitmentHistoryDetails(req, res, next) {
    try {
      const { id } = req.params;

      const history = await JobRecruitmentHistory.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get job recruitment history details",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createJobRecruitmentHistory(req, res, next) {
    try {
      const { name, email, coverLetter, cv } = req.body;

      const history = await JobRecruitmentHistory.create({
        name,
        email,
        coverLetter,
        cv,
      });

      res.status(201).json({
        message: "success create job recruitment history",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteJobRecruitmentHistory(req, res, next) {
    try {
      const { id } = req.params;

      const history = await JobRecruitmentHistory.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      await history.destroy();

      res.status(200).json({
        message: "success delete job recruitment history",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateJobRecruitmentHistory(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, coverLetter, cv } = req.body;

      const history = await JobRecruitmentHistory.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      await history.update({ name, email, coverLetter, cv });

      res.status(200).json({
        message: "success update job recruitment history",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = JobRecruitmentHistoryController;

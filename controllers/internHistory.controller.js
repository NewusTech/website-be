const { InternHistory } = require("../models/index");

class InternHistoryController {
  static async internHistoryLists(req, res, next) {
    try {
      const internHistories = await InternHistory.findAll();

      res.status(200).json({
        message: "success get intern history lists",
        data: internHistories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async internHistoryDetail(req, res, next) {
    try {
      const { id } = req.params;

      const internHistory = await InternHistory.findByPk(id);

      if (!internHistory) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get intern history detail",
        data: internHistory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createInternHistory(req, res, next) {
    try {
      const {
        instituteName,
        email,
        major,
        startDate,
        finishDate,
        applicationLetter,
      } = req.body;

      // Fungsi helper untuk memvalidasi format tanggal
      const isValidDate = (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
      };

      // Memvalidasi tanggal
      if (!isValidDate(startDate) || !isValidDate(finishDate))
        throw { name: "InvalidDate" };

      // Mengonversi tanggal ke objek Date
      const start = new Date(startDate);
      const finish = new Date(finishDate);

      const internHistory = await InternHistory.create({
        instituteName,
        email,
        major,
        startDate: start,
        finishDate: finish,
        applicationLetter,
      });

      res.status(201).json({
        message: "success create intern history",
        data: internHistory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteInternHistory(req, res, next) {
    try {
      const { id } = req.params;

      const internHistory = await InternHistory.findByPk(id);

      if (!internHistory) throw { name: "InvalidId" };

      await internHistory.destroy();

      res.status(200).json({
        message: "success delete intern history",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateInternHistory(req, res, next) {
    try {
      const { id } = req.params;
      const {
        instituteName,
        email,
        major,
        startDate,
        finishDate,
        applicationLetter,
      } = req.body;

      const internHistory = await InternHistory.findByPk(id);

      if (!internHistory) throw { name: "InvalidId" };

      // Fungsi helper untuk memvalidasi format tanggal
      const isValidDate = (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
      };

      // Memvalidasi tanggal
      if (!isValidDate(startDate) || !isValidDate(finishDate))
        throw { name: "InvalidDate" };

      // Mengonversi tanggal ke objek Date
      const start = new Date(startDate);
      const finish = new Date(finishDate);

      await internHistory.update({
        instituteName,
        email,
        major,
        startDate: start,
        finishDate: finish,
        applicationLetter,
      });

      res.status(200).json({
        message: "success update intern history",
        data: internHistory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = InternHistoryController;

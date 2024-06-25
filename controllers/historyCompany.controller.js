const { HistoryCompany } = require("../models/index");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class HistoryCompanyController {
  static async getHistoryCompany(req, res, next) {
    try {
      const history = await HistoryCompany.findAll();

      res.status(200).json({
        message: "success get history company",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addHistoryCompany(req, res, next) {
    try {
      const { title, description, year } = req.body;

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "history-company",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      const history = await HistoryCompany.create({
        title,
        description,
        year,
        image: image,
      });

      res.status(201).json({
        message: "success add history company",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteHistoryCompany(req, res, next) {
    try {
      const { id } = req.params;

      const history = await HistoryCompany.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      await history.destroy();

      res.status(200).json({
        message: "success delete history company",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateHistoryCompany(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, year } = req.body;

      const history = await HistoryCompany.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "history-company",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      await history.update({
        title,
        description,
        year,
        image: image,
      });

      res.status(200).json({
        message: "success update history company",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = HistoryCompanyController;

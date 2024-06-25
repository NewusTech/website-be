const { AboutCompany } = require("../models/index");

class AboutCompanyController {
  static async getaboutCompany(req, res, next) {
    try {
      const company = await AboutCompany.findAll();

      res.status(200).json({
        status: "success get about company",
        data: company,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addAboutCompany(req, res, next) {
    try {
      const { body, vision, mission, address, email, phoneNumber } = req.body;

      const company = await AboutCompany.create({
        body,
        vision,
        mission,
        address,
        email,
        phoneNumber,
      });

      res.status(201).json({
        status: "success add about company",
        data: company,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteAboutCompany(req, res, next) {
    try {
      const { id } = req.params;

      const company = await AboutCompany.findByPk(id);

      if (!company) throw { name: "InvalidId" };

      await company.destroy();

      res.status(200).json({
        status: "success delete about company",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateAboutCompany(req, res, next) {
    try {
      const { id } = req.params;
      const { body, vision, mission, address, email, phoneNumber } = req.body;

      const company = await AboutCompany.findByPk(id);

      if (!company) throw { name: "InvalidId" };

      await company.update({
        body,
        vision,
        mission,
        address,
        email,
        phoneNumber,
      });

      res.status(200).json({
        status: "success update about company",
        data: company,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AboutCompanyController;

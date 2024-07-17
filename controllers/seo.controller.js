const { Seo } = require("../models/index");

const { response } = require('../helpers/response.formatter');

class SeoController {
  static async seoLists(req, res, next) {
    try {
      const seo = await Seo.findAll({
      });

      res.status(200).json({
        message: "Success get seo",
        data: seo,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async seoDetails(req, res, next) {
    try {
      const { id } = req.params;

      const seo = await Seo.findByPk(id, {
      });

      if (!seo) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get seo detail",
        data: seo,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  static async newSeo(req, res, next) {
    try {
      const { googleManager, googleTagManager, searchConsole, googleAnalytics } = req.body;

      const dataCreate = {
        googleManager: googleManager,
        googleTagManager: googleTagManager,
        searchConsole: searchConsole,
        googleAnalytics: googleAnalytics,
      }

      const createSeo = await Seo.create(dataCreate);

      res.status(201).json(response(201, 'success create seo', createSeo));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteSeo(req, res, next) {
    try {
      const { id } = req.params;

      const seo = await Seo.findByPk(id);

      if (!seo) throw { name: "InvalidId" };

      await seo.destroy();

      res.status(200).json({
        message: "Success delete seo",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateSeo(req, res, next) {
    try {
      const { id } = req.params;
      const { googleManager, googleTagManager, searchConsole, googleAnalytics } = req.body;

      const seo = await Seo.findByPk(id);
      if (!seo) throw { name: "InvalidId" };

      await seo.update({
        googleManager: googleManager,
        googleTagManager: googleTagManager,
        searchConsole: searchConsole,
        googleAnalytics: googleAnalytics,
      });

      res.status(200).json({
        message: "success update seo",
        data: seo,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SeoController;

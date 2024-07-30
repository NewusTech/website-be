const { SeoPages } = require("../models/index");

const { response } = require('../helpers/response.formatter');

class SeoPagesController {
  static async seoPageLists(req, res, next) {
    try {
      const seoPages = await SeoPages.findAll({
      });

      res.status(200).json({
        message: "Success get seo pages",
        data: seoPages,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async seoPageDetails(req, res, next) {
    try {
      const { id } = req.params;

      const seoPages = await SeoPages.findByPk(id, {
      });

      if (!seoPages) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get seo pages detail",
        data: seoPages,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  static async newSeoPages(req, res, next) {
    try {
      const { pages, metaTitle, metaDesc } = req.body;

      const dataCreate = {
        pages: pages,
        metaTitle: metaTitle,
        metaDesc: metaDesc,
      }

      const createSeoPages = await SeoPages.create(dataCreate);

      res.status(201).json(response(201, 'success create seo pages', createSeoPages));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteSeoPages(req, res, next) {
    try {
      const { id } = req.params;

      const seoPages = await SeoPages.findByPk(id);

      if (!seoPages) throw { name: "InvalidId" };

      await seoPages.destroy();

      res.status(200).json({
        message: "Success delete seo pages",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateSeoPages(req, res, next) {
    try {
      const { id } = req.params;
      const { pages, metaTitle, metaDesc } = req.body;

      const seo = await SeoPages.findByPk(id);
      if (!seo) throw { name: "InvalidId" };

      await seo.update({
        pages: pages,
        metaTitle: metaTitle,
        metaDesc: metaDesc,
      });

      res.status(200).json({
        message: "success update seo pages",
        data: seo,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SeoPagesController;

const { SocialMedia } = require("../models/index");

class SocialMediaController {
  static async socialMediaLists(req, res, next) {
    try {
      const socialMedia = await SocialMedia.findAll();

      res.status(200).json({
        message: "success get social media",
        data: socialMedia,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async socialMediaDetail(req, res, next) {
    try {
      const { id } = req.params;

      const socialMedia = await SocialMedia.findByPk(id);

      if (!socialMedia) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get social media",
        data: socialMedia,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async newSocialMedia(req, res, next) {
    try {
      const { title, link } = req.body;

      const socialMedia = await SocialMedia.create({ title, link });

      res.status(201).json({
        message: "success create social media",
        data: socialMedia,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteSocialMedia(req, res, next) {
    try {
      const { id } = req.params;

      const socialMedia = await SocialMedia.findByPk(id);

      if (!socialMedia) throw { name: "InvalidId" };

      await socialMedia.destroy();

      res.status(200).json({
        message: "success delete social media",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateSocialMedia(req, res, next) {
    try {
      const { id } = req.params;
      const { title, link } = req.body;

      const socialMedia = await SocialMedia.findByPk(id);

      if (!socialMedia) throw { name: "InvalidId" };

      await socialMedia.update({
        title,
        link,
      });

      res.status(200).json({
        message: "success update social media",
        data: socialMedia,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SocialMediaController;

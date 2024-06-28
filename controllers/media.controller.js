const { Media } = require("../models/index");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class MediaController {
  static async mediaLists(req, res, next) {
    try {
      const medias = await Media.findAll({
      });

      res.status(200).json({
        message: "Success get medias",
        data: medias,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async mediaDetails(req, res, next) {
    try {
      const { id } = req.params;

      const media = await Media.findByPk(id, {
      });

      if (!media) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get media detail",
        data: media,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async newMedia(req, res, next) {
    try {
      const { title, description } = req.body;


      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "media",
        public_id: originalname,
      });

      const image = result.secure_url;

      const newMedia = await Media.create({
        title,
        description,
        image,
      });

      res.status(201).json({
        message: "Success create team",
        data: newMedia,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteMedia(req, res, next) {
    try {
      const { id } = req.params;

      const media = await Media.findByPk(id);

      if (!media) throw { name: "InvalidId" };

      await media.destroy();

      res.status(200).json({
        message: "Success delete media",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateMedia(req, res, next) {
    try {
      const { id } = req.params;
      const {title, description } = req.body;

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "media",
        public_id: originalname,
      });

      const image = result.secure_url;

      const media = await Media.findByPk(id);

      if (!media) throw { name: "InvalidId" };

      await media.update({
        title,
        description,
        image,
      });

      res.status(200).json({
        message: "Success update media",
        data: media,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = MediaController;

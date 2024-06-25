const { CLient } = require("../models/index");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class ClientController {
  static async clientLists(req, res, next) {
    try {
      const client = await CLient.findAll();

      res.status(200).json({
        message: "success get client",
        data: client,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async clientDetails(req, res, next) {
    try {
      const { id } = req.params;

      const client = await CLient.findByPk(id);

      if (!client) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get client detail",
        data: client,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createClient(req, res, next) {
    try {
      const { title } = req.body;

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "client",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      const client = await CLient.create({
        title,
        image: image,
      });

      res.status(201).json({
        message: "success create client",
        data: client,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteClient(req, res, next) {
    try {
      const { id } = req.params;

      const client = await CLient.findByPk(id);

      if (!client) throw { name: "InvalidId" };

      await client.destroy();

      res.status(200).json({
        message: "success delete client",
        data: client,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateClient(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const client = await CLient.findByPk(id);

      if (!client) throw { name: "InvalidId" };

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "client",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      await client.update({
        title,
        image: image,
      });

      res.status(200).json({
        message: "success update client",
        data: client,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ClientController;

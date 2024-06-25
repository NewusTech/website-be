const { Service } = require("../models/index");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class ServiceController {
  static async serviceLists(req, res, next) {
    try {
      const services = await Service.findAll();

      res.status(200).json({
        message: "success get service lists",
        data: services,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async serviceDetail(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findByPk(id);

      if (!service) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get service detail",
        data: service,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createService(req, res, next) {
    try {
      const { title, description } = req.body;

      // configuration for uploading file image uses cloudinary
      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "services",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      const service = await Service.create({
        title,
        description,
        image: image,
      });

      res.status(201).json({
        message: "success create service",
        data: service,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    try {
      const { id } = req.params;

      const service = await Service.findByPk(id);

      if (!service) throw { name: "InvalidId" };

      await service.destroy();

      res.status(200).json({
        message: "success delete service",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateService(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const service = await Service.findByPk(id);

      if (!service) throw { name: "InvalidId" };

      // configuration for uploading file image uses cloudinary
      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "services",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      await service.update({
        title,
        description,
        image: image,
      });

      res.status(200).json({
        message: "success update service",
        data: service,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ServiceController;

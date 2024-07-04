const { Service } = require("../models/index");

const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
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

      let imageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/service/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const dataCreate = {
        title: title,
        description: description,
        image: req.file ? imageKey : undefined
      }

      const createServices = await Service.create(dataCreate);

      res.status(201).json(response(201, 'success create service', createServices));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
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

const { WhyUs } = require("../models/index");

const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

class WhyUsController {
  static async whyUsLists(req, res, next) {
    try {
      const whyus = await WhyUs.findAll({
      });

      res.status(200).json({
        message: "Success get why us",
        data: whyus,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async whyUsDetails(req, res, next) {
    try {
      const { id } = req.params;

      const whyus = await WhyUs.findByPk(id, {
      });

      if (!whyus) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get why us detail",
        data: whyus,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  static async newWhyUs(req, res, next) {
    try {
      const { description } = req.body;

      let imageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/whyus/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const dataCreate = {
        description: description,
        image: req.file ? imageKey : undefined
      }

      const createWhyUs = await WhyUs.create(dataCreate);

      res.status(201).json(response(201, 'success create why us', createWhyUs));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteWhyUs(req, res, next) {
    try {
      const { id } = req.params;

      const whyus = await WhyUs.findByPk(id);

      if (!whyus) throw { name: "InvalidId" };

      await whyus.destroy();

      res.status(200).json({
        message: "Success delete why us",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateWhyUs(req, res, next) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      let imageKey;

      const whyus = await WhyUs.findByPk(id);

      if (!whyus) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/whyus/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await whyus.update({
        description,
        image: req.file ? imageKey : undefined,
      });

      res.status(200).json({
        message: "success update why us",
        data: whyus,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = WhyUsController;

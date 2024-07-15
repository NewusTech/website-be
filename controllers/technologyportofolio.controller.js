const { TechnologyPortofolio } = require("../models/index");

const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

class TechnologyPortofolioController {
  static async technologyportofolioLists(req, res, next) {
    try {
      const technologyportofolio = await TechnologyPortofolio.findAll({
      });

      res.status(200).json({
        message: "Success get technology",
        data: technologyportofolio,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async technologyportofolioDetails(req, res, next) {
    try {
      const { id } = req.params;

      const technologyportofolio = await TechnologyPortofolio.findByPk(id, {
      });

      if (!technologyportofolio) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get technology detail",
        data: technologyportofolio,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  static async newTechnologyPortofolio(req, res, next) {
    try {
      const { title } = req.body;

      let imageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/technology/${uniqueFileName}`,
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
        image: req.file ? imageKey : undefined
      }

      const createTechnologyPortofolio = await TechnologyPortofolio.create(dataCreate);

      res.status(201).json(response(201, 'success create technology', createTechnologyPortofolio));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteTechnologyPortofolio(req, res, next) {
    try {
      const { id } = req.params;

      const technologyportofolio = await TechnologyPortofolio.findByPk(id);

      if (!technologyportofolio) throw { name: "InvalidId" };

      await technologyportofolio.destroy();

      res.status(200).json({
        message: "Success delete technology ",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateTechnologyPortofolio(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      let imageKey;

      const technologyportofolio = await TechnologyPortofolio.findByPk(id);

      if (!technologyportofolio) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/technology/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await technologyportofolio.update({
        title,
        image: req.file ? imageKey : undefined,
      });

      res.status(200).json({
        message: "success update technologyportofolio",
        data: technologyportofolio,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TechnologyPortofolioController;

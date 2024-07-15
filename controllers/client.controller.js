const { CLient } = require("../models/index");
const { response } = require("../helpers/response.formatter");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
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

      let imageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/client/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const dataCreate = {
        title: title,
        image: req.file ? imageKey : undefined,
      };

      const createClient = await CLient.create(dataCreate);

      res
        .status(201)
        .json(response(201, "success create instansi", createClient));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
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
      let imageKey;

      const client = await CLient.findByPk(id);

      if (!client) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/client/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await client.update({
        title,
        image: req.file ? imageKey : undefined,
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

const { Media } = require("../models/index");

const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
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

      let imageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/media/${uniqueFileName}`,
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

      const createMedias = await Media.create(dataCreate);

      res.status(201).json(response(201, 'success create service', createMedias));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
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

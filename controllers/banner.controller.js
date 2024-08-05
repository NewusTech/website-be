const { Banner } = require("../models/index");
const { response } = require("../helpers/response.formatter");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class BannerController {
  static async bannerLists(req, res, next) {
    try {
      const banner = await Banner.findAll();

      res.status(200).json({
        message: "success get banner",
        data: banner,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async bannerDetails(req, res, next) {
    try {
      const { id } = req.params;

      const banner = await Banner.findByPk(id);

      if (!banner) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get banner detail",
        data: banner,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createBanner(req, res, next) {
    try {
      const { metaTitle, metaSubTitle, metaDesc } = req.body;

      let metaImageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/banner/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        metaImageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const dataCreate = {
        metaTitle: metaTitle,
        metaSubTitle: metaSubTitle,
        metaDesc: metaDesc,
        image: req.file ? metaImageKey : undefined,
      };

      const createBanner = await Banner.create(dataCreate);

      res
        .status(201)
        .json(response(201, "success create instansi", createBanner));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  }

  static async deleteBanner(req, res, next) {
    try {
      const { id } = req.params;

      const banner = await Banner.findByPk(id);

      if (!banner) throw { name: "InvalidId" };

      await banner.destroy();

      res.status(200).json({
        message: "success delete banner",
        data: banner,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateBanner(req, res, next) {
    try {
      const { id } = req.params;
      const { metaTitle, metaSubTitle, metaDesc } = req.body;
      let metaImageKey;

      const banner = await Banner.findByPk(id);

      if (!banner) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/banner/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        metaImageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await banner.update({
        metaTitle: metaTitle,
        metaSubTitle: metaSubTitle,
        metaDesc: metaDesc,
        image: req.file ? metaImageKey : undefined,
      });

      res.status(200).json({
        message: "success update banner",
        data: banner,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = BannerController;

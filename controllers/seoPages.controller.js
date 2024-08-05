const { SeoPages } = require("../models/index");
const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class SeoPagesController {
  static async seoPageLists(req, res, next) {
    try {
      const seoPages = await SeoPages.findAll({
      });

      res.status(200).json({
        message: "Success get seo pages",
        data: seoPages,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async seoPageDetails(req, res, next) {
    try {
      const { id } = req.params;

      const seoPages = await SeoPages.findByPk(id, {
      });

      if (!seoPages) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get seo pages detail",
        data: seoPages,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  static async newSeoPages(req, res, next) {
    try {
      const { pages, metaTitle, metaDesc } = req.body;

      let metaImageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/seo/pages/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        metaImageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const dataCreate = {
        pages: pages,
        metaTitle: metaTitle,
        metaDesc: metaDesc,
        metaImage: req.file ? metaImageKey : undefined,
      }

      const createSeoPages = await SeoPages.create(dataCreate);

      res.status(201).json(response(201, 'success create seo pages', createSeoPages));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteSeoPages(req, res, next) {
    try {
      const { id } = req.params;

      const seoPages = await SeoPages.findByPk(id);

      if (!seoPages) throw { name: "InvalidId" };

      await seoPages.destroy();

      res.status(200).json({
        message: "Success delete seo pages",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateSeoPages(req, res, next) {
    try {
      const { id } = req.params;
      const { pages, metaTitle, metaDesc } = req.body;

      let metaImageKey;

      const seo = await SeoPages.findByPk(id);
      if (!seo) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/seo/pages/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        metaImageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await seo.update({
        pages: pages,
        metaTitle: metaTitle,
        metaDesc: metaDesc,
        metaImage: req.file ? metaImageKey : undefined,
      });

      res.status(200).json({
        message: "success update seo pages",
        data: seo,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SeoPagesController;

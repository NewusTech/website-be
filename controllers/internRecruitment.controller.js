const { InternRecruitment } = require("../models/index");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { response } = require('../helpers/response.formatter');

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

class InterRecruitmentController {
  static async internRecruitmentLists(req, res, next) {
    try {
      const intern = await InternRecruitment.findAll();

      res.status(200).json({
        message: "success get internRecruitment",
        data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async internRecruitmentDetail(req, res, next) {
    try {
      const { id } = req.params;

      const intern = await InternRecruitment.findByPk(id);

      if (!intern) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get internRecruitment detail",
        data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createInternRecruitment(req, res, next) {
    try {
      const { description } = req.body;
  
      let fileKey;
  
      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/internrecruitment/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        fileKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataCreate = {
        description,
        coverLetter: req.file ? fileKey : undefined
      }
      const createIntern = await InternRecruitment.create(dataCreate);
  
      res.status(201).json(response(201, 'success create intern recruitment', createIntern));
    } catch (err) {
      console.log(err);
      res.status(500).json(response(500, 'internal intern recruitment error', err));
    }
  }

  static async deleteInternRecruitment(req, res, next) {
    try {
      const { id } = req.params;

      const intern = await InternRecruitment.findByPk(id);

      if (!intern) throw { name: "InvalidId" };

      await intern.destroy();

      res.status(200).json({
        message: "success delete internRecruitment",
        // data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateInternRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      let fileKey;

      const intern = await InternRecruitment.findByPk(id);

      if (!intern) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/internrecruitment/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        fileKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await intern.update({
        description,
        coverLetter: req.file ? fileKey : undefined,
      });

      res.status(200).json({
        message: "success update intern",
        data: intern,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = InterRecruitmentController;

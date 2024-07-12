const { InternHistory } = require("../models/index");
const { response } = require("../helpers/response.formatter");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class InternHistoryController {
  static async internHistoryLists(req, res, next) {
    try {
      const internHistories = await InternHistory.findAll();

      res.status(200).json({
        message: "success get intern history lists",
        data: internHistories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async internHistoryDetail(req, res, next) {
    try {
      const { id } = req.params;

      const internHistory = await InternHistory.findByPk(id);

      if (!internHistory) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get intern history detail",
        data: internHistory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createInternHistory(req, res, next) {
    try {
      const {
        instituteName,
        email,
        startDate,
        finishDate,
        major
      } = req.body;
  
      let applicationLetterKey;
  
      // Handle image upload
      if (req.files && req.files.applicationLetter) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.applicationLetter[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/internrecruit/${uniqueFileName}`,
          Body: req.files.applicationLetter[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.applicationLetter[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        applicationLetterKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataCreate = {
        instituteName,
        email,
        major,
        startDate,
        finishDate,
        applicationLetter: req.files && req.files.applicationLetter ? applicationLetterKey : undefined,
      };
  
      const newIntern = await InternHistory.create(dataCreate);
  
      res
        .status(201)
        .json(response(201, 'success create application intern', newIntern));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteInternHistory(req, res, next) {
    try {
      const { id } = req.params;

      const internHistory = await InternHistory.findByPk(id);

      if (!internHistory) throw { name: "InvalidId" };

      await internHistory.destroy();

      res.status(200).json({
        message: "success delete intern history",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateInternHistory(req, res, next) {
    try {
      const { id } = req.params;
      const {
        instituteName,
        email,
        major,
        startDate,
        finishDate,
        applicationLetter,
      } = req.body;

      const internHistory = await InternHistory.findByPk(id);

      if (!internHistory) throw { name: "InvalidId" };

      // Fungsi helper untuk memvalidasi format tanggal
      const isValidDate = (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime());
      };

      // Memvalidasi tanggal
      if (!isValidDate(startDate) || !isValidDate(finishDate))
        throw { name: "InvalidDate" };

      // Mengonversi tanggal ke objek Date
      const start = new Date(startDate);
      const finish = new Date(finishDate);

      await internHistory.update({
        instituteName,
        email,
        major,
        startDate: start,
        finishDate: finish,
        applicationLetter,
      });

      res.status(200).json({
        message: "success update intern history",
        data: internHistory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = InternHistoryController;

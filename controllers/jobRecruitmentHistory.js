const { JobRecruitmentHistory } = require("../models/index");
const { response } = require("../helpers/response.formatter");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class JobRecruitmentHistoryController {
  static async jobRecruitmentHistoryLists(req, res, next) {
    try {
      const histories = await JobRecruitmentHistory.findAll();

      res.status(200).json({
        message: "success get job recruitment history lists",
        data: histories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async jobRecruitmentHistoryDetails(req, res, next) {
    try {
      const { id } = req.params;

      const history = await JobRecruitmentHistory.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get job recruitment history details",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createJobRecruitmentHistory(req, res, next) {
    try {
      const {
        name,
        email,
      } = req.body;
  
      let coverLetterKey;
      let cvKey;
  
      // Handle image upload
      if (req.files && req.files.coverLetter) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.coverLetter[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/jobrecruitment/${uniqueFileName}`,
          Body: req.files.coverLetter[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.coverLetter[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        coverLetterKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      // Handle logo upload
      if (req.files && req.files.cv) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.cv[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/jobrecruitment/${uniqueFileName}`,
          Body: req.files.cv[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.cv[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        cvKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataCreate = {
        name,
        email,
        coverLetter: req.files && req.files.coverLetter ? coverLetterKey : undefined,
        cv: req.files && req.files.cv ? cvKey : undefined
      };
  
      const newJob = await JobRecruitmentHistory.create(dataCreate);
  
      res
        .status(201)
        .json(response(201, 'success create new job', newJob));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteJobRecruitmentHistory(req, res, next) {
    try {
      const { id } = req.params;

      const history = await JobRecruitmentHistory.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      await history.destroy();

      res.status(200).json({
        message: "success delete job recruitment history",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateJobRecruitmentHistory(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, coverLetter, cv } = req.body;

      const history = await JobRecruitmentHistory.findByPk(id);

      if (!history) throw { name: "InvalidId" };

      await history.update({ name, email, coverLetter, cv });

      res.status(200).json({
        message: "success update job recruitment history",
        data: history,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = JobRecruitmentHistoryController;

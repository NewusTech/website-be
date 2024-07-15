const { Skill } = require("../models/index");

const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

class SkillController {
  static async skillLists(req, res, next) {
    try {
      const skill = await Skill.findAll({
      });

      res.status(200).json({
        message: "Success get skill",
        data: skill,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async skillDetails(req, res, next) {
    try {
      const { id } = req.params;

      const skill = await Skill.findByPk(id, {
      });

      if (!skill) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get skill detail",
        data: skill,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  static async newSkill(req, res, next) {
    try {
      const { title } = req.body;

      let imageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/skill/${uniqueFileName}`,
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

      const createSkill = await Skill.create(dataCreate);

      res.status(201).json(response(201, 'success create skill', createSkill));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteSkill(req, res, next) {
    try {
      const { id } = req.params;

      const skill = await Skill.findByPk(id);

      if (!skill) throw { name: "InvalidId" };

      await skill.destroy();

      res.status(200).json({
        message: "Success delete skill",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateSkill(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      let imageKey;

      const skill = await Skill.findByPk(id);

      if (!skill) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/skill/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await skill.update({
        title,
        image: req.file ? imageKey : undefined,
      });

      res.status(200).json({
        message: "success update skill",
        data: skill,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = SkillController;

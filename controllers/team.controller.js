const { Team, DivitionCategory } = require("../models/index");

const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

class TeamController {
  static async teamLists(req, res, next) {
    try {
      const teams = await Team.findAll({
        include: [
          {
            model: DivitionCategory,
            attributes: ["title", "createdAt"],
          },
        ],
      });

      res.status(200).json({
        message: "Success get teams",
        data: teams,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async teamDetails(req, res, next) {
    try {
      const { id } = req.params;

      const team = await Team.findByPk(id, {
        include: [
          {
            model: DivitionCategory,
            attributes: ["title", "createdAt"],
          },
        ],
      });

      if (!team) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get team detail",
        data: team,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async newTeam(req, res, next) {
    try {
      const { name, title, description, DivitionCategoryId } = req.body;
      const divitionCategoryIdInt = parseInt(DivitionCategoryId, 10);
  
      let imageKey;
      let achievementKey;
  
      // Handle image upload
      if (req.files && req.files.image) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.image[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/team/${uniqueFileName}`,
          Body: req.files.image[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.image[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      // Handle achievement upload
      if (req.files && req.files.achievement) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.achievement[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/team/achievements/${uniqueFileName}`,
          Body: req.files.achievement[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.achievement[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        achievementKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataCreate = {
        name: name,
        title: title,
        description: description,
        DivitionCategoryId: divitionCategoryIdInt,
        image: imageKey, // Tetapkan nilai imageKey, bahkan jika undefined
        achievement: req.files && req.files.achievement ? achievementKey : undefined
      }
  
      const createTeams = await Team.create(dataCreate);
  
      res.status(201).json(response(201, 'success create team', createTeams));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }
  
  static async deleteTeam(req, res, next) {
    try {
      const { id } = req.params;

      const team = await Team.findByPk(id);

      if (!team) throw { name: "InvalidId" };

      await team.destroy();

      res.status(200).json({
        message: "Success delete team",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateTeam(req, res, next) {
    try {
      const { id } = req.params;
      let imageKey;
      let achievementKey;
      const { name, title, description, DivitionCategoryId } = req.body;
      const divitionCategoryIdInt = parseInt(DivitionCategoryId, 10);

      const team = await Team.findByPk(id);

      if (!team) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/team/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      // Handle achievement upload
      if (req.files && req.files.achievement) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.achievement[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/team/achievements/${uniqueFileName}`,
          Body: req.files.achievement[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.achievement[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        achievementKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await team.update({
        name,
        title,
        description,
        image: imageKey, // Tetapkan nilai imageKey, bahkan jika undefined
        achievement: req.files && req.files.achievement ? achievementKey : undefined,
        DivitionCategoryId: divitionCategoryIdInt,
      });

      res.status(200).json({
        message: "Success update team",
        data: team,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TeamController;

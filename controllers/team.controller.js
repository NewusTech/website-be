const { Team, DivitionCategory, TeamSertifikat, TeamProject, TeamSkill } = require("../models/index");

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
          {
            model: TeamSertifikat,
            as: 'teamsertifikat',
            attributes: ["title", "publisher", "startDate", "finishDate", "credentialID", "credentialURL", "media"],
          },
          {
            model: TeamProject,
            as: 'teamproject',
            attributes: ["projectName", "description", "startDate", "finishDate", "url", "media"],
          },
          {
            model: TeamSkill,
            as: 'teamskill',
            attributes: ["title", "media"],
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
          {
            model: TeamSertifikat,
            as: 'teamsertifikat',
            attributes: ["title", "publisher", "startDate", "finishDate", "credentialID", "credentialURL", "media"],
          },
          {
            model: TeamProject,
            as: 'teamproject',
            attributes: ["projectName", "description", "startDate", "finishDate", "url", "media"],
          },
          {
            model: TeamSkill,
            as: 'teamskill',
            attributes: ["title", "media"],
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

  static async getTeamBySlug (req, res, next) {
    try {
      const team = await Team.findOne({
        where: {
          slug: req.params.slug,
        },
        include: [
          {
            model: DivitionCategory,
            attributes: ["title", "createdAt"],
          },
          {
            model: TeamSertifikat,
            as: 'teamsertifikat',
            attributes: ["title", "publisher", "startDate", "finishDate", "credentialID", "credentialURL", "media"],
          },
          {
            model: TeamProject,
            as: 'teamproject',
            attributes: ["projectName", "description", "startDate", "finishDate", "url", "media"],
          },
          {
            model: TeamSkill,
            as: 'teamskill',
            attributes: ["title", "media"],
          },
        ],
      });

      if (!team) throw { name: "InvalidSlug" };

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
      const { name, title, description, DivitionCategoryId, institute, major, joinDate, address, birthdayDate, email, linkedin } = req.body;
      const divitionCategoryIdInt = parseInt(DivitionCategoryId, 10);
  
      let imageKey;
      let certificateImageFiles = [];
      let certificates = JSON.parse(req.body.certificates || '[]');
      let projectImageFiles = [];
      let projects = JSON.parse(req.body.projects || '[]');
      let skillImageFiles = [];
      let skills = JSON.parse(req.body.skills || '[]');
  
      if (req.files) {
        // upload file
        for (let file of req.files) {
          const fieldname = file.fieldname;
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${file.originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/team/${uniqueFileName}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
          };
  
          if (fieldname === 'image') {
            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);
            imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
          } else if (fieldname.startsWith('certificatesImages')) {
            certificateImageFiles.push(file);
          } else if (fieldname.startsWith('projectImages')) {
            projectImageFiles.push(file);
          } else if (fieldname.startsWith('skillImages')) {
            skillImageFiles.push(file);
          }
        }
  
        // Handle certificatesImages upload
        const certificateImageKeys = await Promise.all(certificateImageFiles.map(async (file) => {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${file.originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/team/certificates/${uniqueFileName}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }));
  
        // Handle projectImage upload
        const projectImageKeys = await Promise.all(projectImageFiles.map(async (file) => {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${file.originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/team/project/${uniqueFileName}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }));

         // Handle skillImage upload
         const skillImageKeys = await Promise.all(skillImageFiles.map(async (file) => {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${file.originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/team/skill/${uniqueFileName}`,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }));
  
        // Simpan data ke database
        const newTeamData = {
          name,
          title,
          description,
          institute,
          major,
          joinDate,
          address,
          birthdayDate,
          email,
          linkedin,
          DivitionCategoryId: divitionCategoryIdInt,
          image: imageKey || null,
          achievement: achievementKey || null,
        };
  
        const newTeam = await Team.create(newTeamData);
  
        for (let i = 0; i < certificates.length; i++) {
          const certData = certificates[i];
          const media = certificateImageKeys[i] || null;
          await TeamSertifikat.create({
            TeamId: newTeam.id,
            title: certData.title,
            publisher: certData.publisher,
            startDate: certData.startDate,
            finishDate: certData.finishDate,
            credentialID: certData.credentialID,
            credentialURL: certData.credentialURL,
            media,
          });
        }
  
        for (let i = 0; i < projects.length; i++) {
          const projectData = projects[i];
          const media = projectImageKeys[i] || null;
          if (!media) {
            throw new Error(`Media for project ${projectData.projectName} cannot be null`);
          }
          await TeamProject.create({
            TeamId: newTeam.id,
            projectName: projectData.projectName,
            description: projectData.description,
            startDate: projectData.startDate,
            finishDate: projectData.finishDate,
            url: projectData.url,
            media,
          });
        }

        for (let i = 0; i < skills.length; i++) {
          const skillData = skills[i];
          const media = skillImageKeys[i] || null;
          if (!media) {
            throw new Error(`Media for skill ${skillData.projectName} cannot be null`);
          }
          await TeamSkill.create({
            TeamId: newTeam.id,
            title: skillData.title,
            media,
          });
        }
  
        res.status(201).json({ status: 201, message: 'Team created successfully', data: newTeam });
      } else {
        res.status(400).json({ status: 400, message: 'No files were uploaded' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
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
      const { name, title, description, DivitionCategoryId, institute, major, joinDate, address, birthdayDate, email, linkedin } = req.body;
      const divitionCategoryIdInt = parseInt(DivitionCategoryId, 10);

      const team = await Team.findByPk(id);

      if (!team) throw { name: "InvalidId" };

      // Log untuk memeriksa file yang diterima
      console.log('Files:', req.files);

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

      await team.update({
        name,
        title,
        description,
        institute,
        major,
        joinDate,
        address,
        birthdayDate,
        email,
        linkedin,
        image: imageKey || team.image, // Tetapkan nilai imageKey atau tetap nilai lama jika undefined
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

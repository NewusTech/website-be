const { Team, DivitionCategory } = require("../models/index");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
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

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "team",
        public_id: originalname,
      });

      const image = result.secure_url;

      const newTeam = await Team.create({
        name,
        title,
        description,
        image,
        DivitionCategoryId: divitionCategoryIdInt,
      });

      res.status(201).json({
        message: "Success create team",
        data: newTeam,
      });
    } catch (error) {
      console.log(error);
      next(error);
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
      const { name, title, description, DivitionCategoryId } = req.body;

      const divitionCategoryIdInt = parseInt(DivitionCategoryId, 10);

      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "team",
        public_id: originalname,
      });

      const image = result.secure_url;

      const team = await Team.findByPk(id);

      if (!team) throw { name: "InvalidId" };

      await team.update({
        name,
        title,
        description,
        image,
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

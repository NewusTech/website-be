"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsTo(models.DivitionCategory);
      Team.hasMany(models.TeamSertifikat, {
        foreignKey: 'TeamId',
        as: 'teamsertifikat'
      });
      Team.hasMany(models.TeamProject, {
        foreignKey: 'TeamId',
        as: 'teamproject'
      });
      Team.hasMany(models.TeamSkill, {
        foreignKey: 'TeamId',
        as: 'teamskill'
      });
    }
  }
  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name can not be empty",
          },
          notNull: {
            msg: "Name can not be empty",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description can not be empty",
          },
          notNull: {
            msg: "Description can not be empty",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image can not be empty",
          },
          notNull: {
            msg: "Image can not be empty",
          },
        },
      },
      DivitionCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Divition Category ID is required",
          },
          notNull: {
            msg: "Divition Category ID is required",
          },
        },
      },
      institute: DataTypes.STRING,
      major: DataTypes.STRING,
      joinDate: DataTypes.STRING,
      address: DataTypes.STRING,
      birthdayDate: DataTypes.STRING,
      email: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      achievement: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Achievement can not be empty",
          },
          notNull: {
            msg: "Achievement can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};

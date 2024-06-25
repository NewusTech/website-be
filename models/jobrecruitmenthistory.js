"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobRecruitmentHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobRecruitmentHistory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email can not be empty",
          },
          notNull: {
            msg: "Email can not be empty",
          },
        },
      },
      coverLetter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Cover Letter can not be empty",
          },
          notNull: {
            msg: "Cover Letter can not be empty",
          },
        },
      },
      cv: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CV is required",
          },
          notNull: {
            msg: "CV is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "JobRecruitmentHistory",
    }
  );
  return JobRecruitmentHistory;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecruitmentJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecruitmentJob.belongsTo(models.JobCategory);
    }
  }
  RecruitmentJob.init(
    {
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
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
        },
      },
      salary: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Salary can not be empty",
          },
          notEmpty: {
            msg: "Salary can not be empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Status can not be empty",
          },
          notNull: {
            msg: "Status can not be empty",
          },
        },
      },
      coverLetter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Cover Letter is required",
          },
          notNull: {
            msg: "Cover Letter is required",
          },
        },
      },
      JobCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Job Category Id is required",
          },
          notEmpty: {
            msg: "Job Category Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "RecruitmentJob",
    }
  );
  return RecruitmentJob;
};

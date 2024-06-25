"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InternHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InternHistory.init(
    {
      instituteName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Institute Name is required",
          },
          notNull: {
            msg: "Institute Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
        },
      },
      major: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Major is required",
          },
          notNull: {
            msg: "Major is required",
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Intern Start Date can not be empty",
          },
          notNull: {
            msg: "Intern Start Date can not be empty",
          },
        },
      },
      finishDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Intern Finish Date can not be empty",
          },
          notNull: {
            msg: "Intern Finish Date can not be empty",
          },
        },
      },
      applicationLetter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Application Letter is required",
          },
          notNull: {
            msg: "Application Letter is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "InternHistory",
    }
  );
  return InternHistory;
};

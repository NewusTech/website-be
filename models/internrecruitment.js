"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InternRecruitment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InternRecruitment.init(
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description cannot be empty",
          },
          notNull: {
            msg: "Description cannot be null",
          },
        },
      },
      coverLetter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Cover Letter cannot be empty",
          },
          notNull: {
            msg: "Cover Letter cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "InternRecruitment",
    }
  );
  return InternRecruitment;
};

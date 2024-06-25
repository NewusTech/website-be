"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoryCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoryCompany.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title can be not empty",
          },
          notNull: {
            msg: "Title can be not empty",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description can be not empty",
          },
          notNull: {
            msg: "Description can be not empty",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image can be not empty",
          },
          notNull: {
            msg: "Image can be not empty",
          },
        },
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Year can be not empty",
          },
          notNull: {
            msg: "Year can be not empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "HistoryCompany",
    }
  );
  return HistoryCompany;
};

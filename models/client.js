"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CLient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CLient.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title can not be empty",
          },
          notEmpty: {
            msg: "Title can not be empty",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image can not be empty",
          },
          notEmpty: {
            msg: "Image can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "CLient",
    }
  );
  return CLient;
};

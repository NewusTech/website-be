"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DivitionCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DivitionCategory.hasMany(models.Team, {
        foreignKey: "DivitionCategoryId",
      });
    }
  }
  DivitionCategory.init(
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
    },
    {
      sequelize,
      modelName: "DivitionCategory",
    }
  );
  return DivitionCategory;
};

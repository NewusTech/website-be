"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeoPages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SeoPages.init(
    {

      pages: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      metaImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SeoPages",
    }
  );
  return SeoPages;
};

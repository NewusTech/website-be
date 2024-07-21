"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecomendationBlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RecomendationBlog.belongsTo(models.Blog, {
        foreignKey: 'BlogId',
        as: 'blog'
      });
    }
  }
  RecomendationBlog.init(
    {
      BlogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: "RecomendationBlog",
    }
  );
  return RecomendationBlog;
};

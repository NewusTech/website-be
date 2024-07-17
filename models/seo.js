'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Seo.init({
    tagManager: DataTypes.STRING,
    googleTagManager: DataTypes.STRING,
    searchConsole: DataTypes.STRING,
    googleAnalytics: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seo',
  });
  return Seo;
};
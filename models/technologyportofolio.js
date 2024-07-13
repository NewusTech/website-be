'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TechnologyPortofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TechnologyPortofolio.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TechnologyPortofolio',
  });
  return TechnologyPortofolio;
};
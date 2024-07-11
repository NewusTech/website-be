'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WhyUs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WhyUs.init({
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WhyUs',
  });
  return WhyUs;
};
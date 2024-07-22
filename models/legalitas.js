//kode dari file Blog.js

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Legalitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Legalitas.init({
    companyProfile: DataTypes.STRING,
    aktaPendirian: DataTypes.STRING,
    suratPengesahan: DataTypes.STRING,
    sertifikasi: DataTypes.STRING,
    bidangUsaha: DataTypes.STRING,
    npwp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Legalitas',
  });
  return Legalitas;
};
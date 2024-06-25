//kode dari file Kategoriportofolio.js

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kategoriportofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kategoriportofolio.hasMany(models.Portfolio, {
        foreignKey: "KategoriportofolioId",
      });
    }
  }
  Kategoriportofolio.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Kategoriportofolio",
    }
  );
  return Kategoriportofolio;
};

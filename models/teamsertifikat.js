"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamSertifikat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamSertifikat.belongsTo(models.Team, {
        foreignKey: 'TeamId',
        as: 'team'
      });
    }
  }
  TeamSertifikat.init(
    {

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      finishDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credentialID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      credentialURL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      media: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: "TeamSertifikat",
    }
  );
  return TeamSertifikat;
};

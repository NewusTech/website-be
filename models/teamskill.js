"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamSkill.belongsTo(models.Team, {
        foreignKey: 'TeamId',
        as: 'team'
      });
    }
  }
  TeamSkill.init(
    {

      title: {
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
      modelName: "TeamSkill",
    }
  );
  return TeamSkill;
};

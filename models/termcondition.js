"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TermCondition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TermCondition.init(
    {

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TermCondition",
    }
  );
  return TermCondition;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AboutCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AboutCompany.init(
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Body can not be empty",
          },
          notNull: {
            msg: "Body can not be empty",
          },
        },
      },
      vision: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Vision can not be empty",
          },
          notNull: {
            msg: "Vision can not be empty",
          },
        },
      },
      mission: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Mission can not be empty",
          },
          notNull: {
            msg: "Mission can not be empty",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address can not be empty",
          },
          notNull: {
            msg: "Address can not be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email can not be empty",
          },
          notNull: {
            msg: "Email can not be empty",
          },
        },
      },
      siteTitle: DataTypes.STRING,
      siteDescription: DataTypes.STRING,
      siteLogo: DataTypes.STRING,
      footerLogo: DataTypes.STRING,
      favicon: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number can not be empty",
          },
          notNull: {
            msg: "Phone Number can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "AboutCompany",
    }
  );
  return AboutCompany;
};

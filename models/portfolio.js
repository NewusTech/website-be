"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portfolio.belongsTo(models.Kategoriportofolio);
      Portfolio.belongsTo(models.Tagportofolio);
    }
  }
  Portfolio.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Slug is required",
          },
          notEmpty: {
            msg: "Slug is required",
          },
        },
      },
      keyword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Keyword is required",
          },
          notEmpty: {
            msg: "Keyword is required",
          },
        },
      },
      excerpt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Excerpt is required",
          },
          notEmpty: {
            msg: "Excerpt is required",
          },
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Body must be required",
          },
          notEmpty: {
            msg: "Body must be required",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image is required",
          },
          notEmpty: {
            msg: "Image is required",
          },
        },
      },
      portfolioYear: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Year of portfolio can not be empty",
          },
          notEmpty: {
            msg: "Year of portfolio can not be empty",
          },
        },
      },
      webLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Web link must be required",
          },
          notEmpty: {
            msg: "Web link must be required",
          },
        },
      },
      appsLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Apps link must be required",
          },
          notEmpty: {
            msg: "Apps link must be required",
          },
        },
      },
      KategoriportofolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TagportofolioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Portfolio",
    }
  );
  return Portfolio;
};

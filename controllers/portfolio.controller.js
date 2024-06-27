const { Op } = require("sequelize");
const {
  Kategoriportofolio,
  Tagportofolio,
  Portfolio,
} = require("../models/index");
const { default: slugify } = require("slugify");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

class PortfolioController {
  // method for getting all portofolio
  static async portfolioLists(req, res, next) {
    try {
      // req query untuk filter berdasarkan category project
      // req query untuk membuat pagination
      // req query untuk mencari project
      const { search, filter, page } = req.query;

      // declare variable with empty object value
      let options = {};

      // logic untuk do filter based on portfolio Category by Id
      if (filter) {
        options.where = {
          KategoriportofolioId: filter,
        };
      }

      // declare for pagination
      let limit = 10;
      let currentPage = 1;

      // logic for pagination
      if (page) {
        if (page.limit) {
          limit = page.limit;
          options.limit = limit;
        }
        if (page.currentPage) {
          currentPage = page.currentPage;
          options.offset = limit * (currentPage - 1);
        }
      }

      // logic for query search
      if (search) {
        options.where = {
          ...options.where,
          title: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      // relation for Portfolio Category and Portfolio Tag Data
      options.include = [
        {
          model: Kategoriportofolio,
          attributes: ["title", "createdAt"],
        },
        {
          model: Tagportofolio,
          attributes: ["title", "createdAt"],
        },
      ];

      // using method findAndCountAll from sequelize documentation
      const portfolios = await Portfolio.findAndCountAll(options);

      // count total page for pagination
      let totalPage = Math.ceil(portfolios.count / limit);

      // logic for validate pagination and output
      if (page?.limit || page?.currentPage) {
        res.status(200).json({
          count: portfolios.count,
          portfolios: portfolios.rows,
          limit: +limit,
          currentPage: +currentPage,
          totalPage,
        });
      } else {
        res
          .status(200)
          .json({ count: portfolios.count, portfolios: portfolios.rows });
      }
    } catch (error) {
      console.log(error);
      // using error handler to handle error
      next(error);
    }
  }

  // method for portfolio detail
  static async portfolioDetail(req, res, next) {
    try {
        // getting params from slug
        const { slug } = req.params;

        // method to check portfolio detail
        const portfolio = await Portfolio.findOne({
            where: { slug: slug }, // Using slug directly from params
            include: [
                {
                    model: Kategoriportofolio,
                    attributes: ["title", "createdAt"],
                },
                {
                    model: Tagportofolio,
                    attributes: ["title", "createdAt"],
                },
            ],
        });

        // method to check if portfolio doesn't exist
        if (!portfolio) throw { name: "InvalidSlug" };

        res.status(200).json({ portfolio });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

  // method for creating new portfolio
  static async newPortfolio(req, res, next) {
    try {
      // req body for get value
      const {
        title,
        keyword,
        excerpt,
        body,
        TagportofolioId,
        KategoriportofolioId,
        webLink,
        appsLink,
      } = req.body;

      // changing ref Id from String to Integer
      const portfolioTagIdInt = parseInt(TagportofolioId, 10);
      const portfolioCategoryIdInt = parseInt(KategoriportofolioId, 10);

      // configuration for uploading file image uses cloudinary
      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "portfolio",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      // method to create new portfolio
      const portfolio = await Portfolio.create({
        title,
        slug: slugify(title, { lower: true }),
        keyword,
        excerpt,
        body,
        TagportofolioId: portfolioTagIdInt,
        KategoriportofolioId: portfolioCategoryIdInt,
        image: image,
        webLink,
        appsLink,
        portfolioYear: String(new Date()),
      });

      res.status(201).json({
        message: "Success add new portfolio",
        data: portfolio,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  // method for deleting portfolio
  static async deletePortfolio(req, res, next) {
    try {
      // getting params to check portfolio from db
      const { id } = req.params;

      // method to check if portfolio exist
      const portfolio = await Portfolio.findByPk(id);

      // validate if portfolio doesn't exist
      if (!portfolio) throw { name: "InvalidId" };

      // method to delete portfolio
      await portfolio.destroy();

      res.status(200).json({
        message: `${portfolio.title} successfully deleted portfolio`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // method for updating portfolio
  static async updatePortfolio(req, res, next) {
    try {
      // getting params to check portfolio from db
      const { id } = req.params;

      // req body for get value
      const {
        title,
        keyword,
        excerpt,
        body,
        TagportofolioId,
        KategoriportofolioId,
        webLink,
        appsLink,
      } = req.body;

      // method to check if portfolio exist
      const portfolio = await Portfolio.findByPk(id);

      // validate if portfolio doesn't exist
      if (!portfolio) throw { name: "InvalidId" };

      // changing ref Id from String to Integer
      const portfolioTagIdInt = parseInt(TagportofolioId, 10);
      const portfolioCategoryIdInt = parseInt(KategoriportofolioId, 10);

      // configuration for uploading file image uses cloudinary
      const { mimetype, buffer, originalname } = req.file;
      const base64 = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        // result to save image upload to folder
        folder: "portfolio",
        // for naming file upload
        public_id: originalname,
      });

      // to get image url from cloudinary
      const image = result.secure_url;

      // method to update portfolio
      await portfolio.update({
        title,
        slug: slugify(title, { lower: true }),
        keyword,
        excerpt,
        body,
        TagportofolioId: portfolioTagIdInt,
        KategoriportofolioId: portfolioCategoryIdInt,
        image: image,
        webLink,
        appsLink,
        portfolioYear: String(new Date()),
      });

      res.status(200).json({
        message: "Successfully updated portfolio",
        data: portfolio,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PortfolioController;

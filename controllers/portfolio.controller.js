const { Op } = require("sequelize");
const { response } = require("../helpers/response.formatter");
const {
  Kategoriportofolio,
  Tagportofolio,
  Portfolio,
} = require("../models/index");
const { default: slugify } = require("slugify");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
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

  static async newPortfolio(req, res, next) {
    try {
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
  
      let imageKey;
      let logoKey;
  
      // Handle image upload
      if (req.files && req.files.image) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.image[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/portofolio/${uniqueFileName}`,
          Body: req.files.image[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.image[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      // Handle logo upload
      if (req.files && req.files.logo) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.logo[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/portofolio/${uniqueFileName}`,
          Body: req.files.logo[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.logo[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        logoKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataCreate = {
        title,
        slug: slugify(title, { lower: true }),
        keyword,
        excerpt,
        body,
        TagportofolioId,
        KategoriportofolioId,
        webLink,
        appsLink,
        portfolioYear: String(new Date()),
        image: req.files && req.files.image ? imageKey : undefined,
        logo: req.files && req.files.logo ? logoKey : undefined
      };
  
      const newPortfolio = await Portfolio.create(dataCreate);
  
      res
        .status(201)
        .json(response(201, 'success create new portfolio', newPortfolio));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
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

  static async updatePortfolio(req, res, next) {
    try {
      const { id } = req.params;
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

      let imageKey;
      let logoKey;
  
      const portfolio = await Portfolio.findByPk(id);

      if (!portfolio) throw { name: "InvalidId" };

      // Ensure title is a string
      if (typeof title !== 'string') {
        throw { name: "InvalidTitle", message: "Title must be a string" };
      }

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/portofolio/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      
      // Handle logo upload
      if (req.files && req.files.logo) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.logo[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/portofolio/${uniqueFileName}`,
          Body: req.files.logo[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.logo[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        logoKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const dataUpdate = {
        title,
        slug: slugify(title, { lower: true }),
        keyword,
        excerpt,
        body,
        TagportofolioId,
        KategoriportofolioId,
        webLink,
        appsLink,
        portfolioYear: new Date().getFullYear(), // Change to get only the year
        image: req.file ? imageKey : undefined,
        logo: req.file ? logoKey : undefined, // update image only if new file is uploaded
      };

      // Add where clause to specify which portfolio to update
      await Portfolio.update(dataUpdate, {
        where: { id },
      });

      const updatedPortfolio = await Portfolio.findByPk(id); // Fetch the updated portfolio data

      res.status(200).json({
        message: "Successfully updated portfolio",
        data: updatedPortfolio,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
        error: err.message || err,
      });
      console.log(err);
    }
  }
}

module.exports = PortfolioController;

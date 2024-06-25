const { RecruitmentJob, JobCategory } = require("../models/index");

class JobRecruitmentController {
  // method for getting job recruitment lists
  static async jobRecruitmentLists(req, res, next) {
    try {
      // req query untuk filter berdasarkan category project
      // req query untuk membuat pagination
      // req query untuk mencari project
      const { search, filter, page } = req.query;

      // declare variable with empty object value
      let options = {};

      // logic untuk do filter based on job Category by Id
      if (filter) {
        options.where = {
          JobCategoryId: filter,
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

      // relation for job Category
      options.include = [
        {
          model: JobCategory,
          attributes: ["title", "createdAt"],
        },
      ];

      // using method findAndCountAll from sequelize documentation
      const jobRecruitment = await RecruitmentJob.findAndCountAll(options);

      // count total page for pagination
      let totalPage = Math.ceil(jobRecruitment.count / limit);

      // logic for validate pagination and output
      if (page?.limit || page?.currentPage) {
        res.status(200).json({
          count: jobRecruitment.count,
          jobRecruitment: jobRecruitment.rows,
          limit: +limit,
          currentPage: +currentPage,
          totalPage,
        });
      } else {
        res.status(200).json({
          count: jobRecruitment.count,
          jobRecruitment: jobRecruitment.rows,
        });
      }
    } catch (error) {
      console.log(error);
      // using error handler to handle error
      next(error);
    }
  }

  // method fot getting job recruitment detail
  static async jobRecruitmentDetail(req, res, next) {
    try {
      const { id } = req.params;

      const jobRecruitment = await RecruitmentJob.findByPk(id, {
        include: [
          {
            model: JobCategory,
            attributes: ["title", "createdAt"],
          },
        ],
      });

      if (!jobRecruitment) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success getting job recruitment detail",
        data: jobRecruitment,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // method for creating job recruitment
  static async newJobRecruitment(req, res, next) {
    try {
      // for getting value of req body
      const { title, description, salary, status, coverLetter, JobCategoryId } =
        req.body;

      // method for creating new job recruitment
      const jobRecruitment = await RecruitmentJob.create({
        title,
        description,
        salary,
        status,
        coverLetter,
        JobCategoryId,
      });

      res.status(201).json({
        message: "Success creating new job recruitment",
        data: jobRecruitment,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // method for deleting job recruitment
  static async deleteJobRecruitment(req, res, next) {
    try {
      const { id } = req.params;

      // method for checking data from db
      const jobRecruitment = await RecruitmentJob.findByPk(id);

      // check if data does not exist
      if (!jobRecruitment) throw { name: "InvalidId" };

      // method for deleting job recruitment
      await jobRecruitment.destroy();

      res.status(200).json({
        message: "Success deleting job recruitment",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateJobRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description, salary, status, coverLetter, JobCategoryId } =
        req.body;

      const jobRecruitment = await RecruitmentJob.findByPk(id);

      if (!jobRecruitment) throw { name: "InvalidId" };

      await jobRecruitment.update({
        title,
        description,
        salary,
        status,
        coverLetter,
        JobCategoryId,
      });

      res.status(200).json({
        message: "Success updating job recruitment",
        data: jobRecruitment,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = JobRecruitmentController;

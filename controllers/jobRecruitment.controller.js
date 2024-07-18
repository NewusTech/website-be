const { RecruitmentJob, JobCategory } = require("../models/index");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { response } = require('../helpers/response.formatter');

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

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
      const { title, description, salary, status, JobCategoryId } = req.body;
  
      let fileKey;
  
      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/jobrecruitment/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        fileKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataCreate = {
        title,
        description,
        salary,
        status,
        JobCategoryId,
        coverLetter: req.file ? fileKey : undefined
      }
      const createJob = await RecruitmentJob.create(dataCreate);
  
      res.status(201).json(response(201, 'success create job recruitment', createJob));
    } catch (err) {
      console.log(err);
      res.status(500).json(response(500, 'internal job recruitment error', err));
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
        let coverLetterKey;

        const jobRecruitment = await RecruitmentJob.findByPk(id);

        if (!jobRecruitment) throw { name: "InvalidId" };

        // Validate JobCategoryId existence in jobcategories table
        const jobCategory = await JobCategory.findByPk(Number(req.body.JobCategoryId));
        if (!jobCategory) {
            throw { name: "InvalidJobCategory", message: "Job Category not found" };
        }

        if (req.file) {
            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}-${req.file.originalname}`;

            const uploadParams = {
                Bucket: process.env.AWS_BUCKET,
                Key: `webnewus/jobRecruitment/${uniqueFileName}`,
                Body: req.file.buffer,
                ACL: 'public-read',
                ContentType: req.file.mimetype
            };

            const command = new PutObjectCommand(uploadParams);

            await s3Client.send(command);

            coverLetterKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }

        await jobRecruitment.update({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            status: req.body.status,
            JobCategoryId: Number(req.body.JobCategoryId),
            coverLetter: req.file ? coverLetterKey : jobRecruitment.coverLetter
        });

        res.status(200).json({
            message: "success update job",
            data: jobRecruitment,
        });
    } catch (error) {
        console.error(error);
        if (error.name === "InvalidJobCategory") {
            res.status(400).json({ error: error.message });
        } else {
            next(error);
        }
    }
}

}

module.exports = JobRecruitmentController;

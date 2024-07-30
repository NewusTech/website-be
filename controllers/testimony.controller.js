const { Testimony } = require("../models/index");
const { response } = require('../helpers/response.formatter');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

class TestimonyController {
  static async testimonyLists(req, res, next) {
    try {
      const testy = await Testimony.findAll({
      });

      res.status(200).json({
        message: "Success get testy",
        data: testy,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async testimonyDetails(req, res, next) {
    try {
      const { id } = req.params;

      const testimony = await Testimony.findByPk(id, {
      });

      if (!testimony) throw { name: "InvalidId" };

      res.status(200).json({
        message: "Success get testimony detail",
        data: testimony,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async newTestimony(req, res, next) {
    try {
      const { name, title, companyName, testimony, rating } = req.body;

      let imageKey;

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/testimony/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const dataCreate = {
        name: name,
        title: title,
        companyName: companyName,
        testimony:testimony,
        rating: rating,
        image: req.file ? imageKey : undefined
      }

      const createTestimony = await Testimony.create(dataCreate);

      res.status(201).json(response(201, 'success create testimony', createTestimony));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }

  static async deleteTestimony(req, res, next) {
    try {
      const { id } = req.params;

      const testimony = await Testimony.findByPk(id);

      if (!testimony) throw { name: "InvalidId" };

      await testimony.destroy();

      res.status(200).json({
        message: "Success delete testimony",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateTestimony(req, res, next) {
    try {
      const { id } = req.params;
      const { name, title, companyName,testimony, rating } = req.body;
  
      const testi = await Testimony.findByPk(id);
  
      if (!testi) throw { name: "InvalidId" };
  
      let imageKey;
  
      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/testimony/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataUpdate = {
        name: name,
        title: title,
        companyName: companyName,
        testimony: testimony,
        rating: rating,
        image: req.file ? imageKey : testimony.image // update image only if new file is uploaded
      };
  
      // Add where clause to specify which client to update
      await Testimony.update(dataUpdate, {
        where: { id: id }
      });
  
      const updatedTestimony = await Testimony.findByPk(id); // Fetch the updated client data
  
      res.status(200).json(response(200, 'success update testimony', updatedTestimony));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  }
}

module.exports = TestimonyController;

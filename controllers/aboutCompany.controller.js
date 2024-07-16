const { AboutCompany } = require("../models/index");
const { response } = require("../helpers/response.formatter");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

class AboutCompanyController {
  static async getaboutCompany(req, res, next) {
    try {
      const company = await AboutCompany.findAll();

      res.status(200).json({
        status: "success get about company",
        data: company,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addAboutCompany(req, res, next) {
    try {
      const { body, vision, mission, address, email, phoneNumber, siteTitle, siteDescription } = req.body;
      
      let siteLogoKey;
      let footerLogoKey;
      let faviconKey;

      // Handle siteLogo upload
      if (req.files && req.files.siteLogo) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.siteLogo[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/aboutcompany/${uniqueFileName}`,
          Body: req.files.siteLogo[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.siteLogo[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        siteLogoKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      // Handle footerLogo upload
      if (req.files && req.files.footerLogo) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.footerLogo[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/aboutcompany/${uniqueFileName}`,
          Body: req.files.footerLogo[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.footerLogo[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        footerLogoKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      // Handle footerLogo upload
      if (req.files && req.files.favicon) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.favicon[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/aboutcompany/${uniqueFileName}`,
          Body: req.files.favicon[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.favicon[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        faviconKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      const company = await AboutCompany.create({
        body,
        vision,
        mission,
        address,
        email,
        phoneNumber,
        siteTitle,
        siteDescription,
        siteLogo: req.files && req.files.siteLogo ? siteLogoKey : undefined,
        footerLogo: req.files && req.files.footerLogo ? footerLogoKey : undefined,
        favicon: req.files && req.files.favicon ? faviconKey : undefined,
      });

      res.status(201).json({
        status: "success add about company",
        data: company,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteAboutCompany(req, res, next) {
    try {
      const { id } = req.params;

      const company = await AboutCompany.findByPk(id);

      if (!company) throw { name: "InvalidId" };

      await company.destroy();

      res.status(200).json({
        status: "success delete about company",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateAboutCompany(req, res, next) {
    try {
      const { id } = req.params;
      const { body, vision, mission, address, email, phoneNumber, siteTitle, siteDescription} = req.body;

      let siteLogoKey;
      let footerLogoKey;
      let faviconKey;
      const company = await AboutCompany.findByPk(id);

      if (!company) throw { name: "InvalidId" };

       // Handle siteLogo upload
       if (req.files && req.files.siteLogo) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.siteLogo[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/aboutcompany/${uniqueFileName}`,
          Body: req.files.siteLogo[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.siteLogo[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        siteLogoKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      // Handle footerLogo upload
      if (req.files && req.files.footerLogo) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.footerLogo[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/aboutcompany/${uniqueFileName}`,
          Body: req.files.footerLogo[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.footerLogo[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        footerLogoKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      // Handle footerLogo upload
      if (req.files && req.files.favicon) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.favicon[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/aboutcompany/${uniqueFileName}`,
          Body: req.files.favicon[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.favicon[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        faviconKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await company.update({
        body,
        vision,
        mission,
        address,
        email,
        phoneNumber,
        siteTitle,
        siteDescription,
        siteLogo: req.files && req.files.siteLogo ? siteLogoKey : undefined,
        footerLogo: req.files && req.files.footerLogo ? footerLogoKey : undefined,
        favicon: req.files && req.files.favicon ? faviconKey : undefined,
      });

      res.status(200).json({
        status: "success update about company",
        data: company,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AboutCompanyController;

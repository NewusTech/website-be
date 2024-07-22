const { Legalitas } = require("../models/index");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { response } = require('../helpers/response.formatter');

const s3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

class LegalitasController {
  static async legalitasLists(req, res, next) {
    try {
      const legalitas = await Legalitas.findAll();

      res.status(200).json({
        message: "success get legalitas",
        data: legalitas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async legalitasDetail(req, res, next) {
    try {
      const { id } = req.params;

      const legalitas = await Legalitas.findByPk(id);

      if (!legalitas) throw { name: "InvalidId" };

      res.status(200).json({
        message: "success get legalitas detail",
        data: legalitas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createLegalitas(req, res, next) {
    try {
      let companyprofileKey = null;
      let aktaPendirianKey = null;
      let suratPengesahanKey = null;
      let sertifikasiKey = null;
      let bidangUsahaKey = null;
      let npwpKey = null;
  
      if (req.files) {
        if (req.files.companyProfile) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.companyProfile[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.companyProfile[0].buffer,
            ACL: "public-read",
            ContentType: req.files.companyProfile[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          companyprofileKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
  
        if (req.files.aktaPendirian) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.aktaPendirian[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.aktaPendirian[0].buffer,
            ACL: "public-read",
            ContentType: req.files.aktaPendirian[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          aktaPendirianKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
  
        if (req.files.suratPengesahan) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.suratPengesahan[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.suratPengesahan[0].buffer,
            ACL: "public-read",
            ContentType: req.files.suratPengesahan[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          suratPengesahanKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
  
        if (req.files.sertifikasi) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.sertifikasi[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.sertifikasi[0].buffer,
            ACL: "public-read",
            ContentType: req.files.sertifikasi[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          sertifikasiKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
  
        if (req.files.bidangUsaha) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.bidangUsaha[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.bidangUsaha[0].buffer,
            ACL: "public-read",
            ContentType: req.files.bidangUsaha[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          bidangUsahaKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
  
        if (req.files.npwp) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.npwp[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.npwp[0].buffer,
            ACL: "public-read",
            ContentType: req.files.npwp[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          npwpKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
      }
  
      const dataCreate = {
        companyProfile: companyprofileKey,
        aktaPendirian: aktaPendirianKey,
        suratPengesahan: suratPengesahanKey,
        sertifikasi: sertifikasiKey,
        bidangUsaha: bidangUsahaKey,
        npwp: npwpKey
      };
  
      const createLegalitas = await Legalitas.create(dataCreate);
  
      res.status(201).json(response(201, 'success create legalitas', createLegalitas));
    } catch (err) {
      console.log(err);
      res.status(500).json(response(500, 'internal legalitas error', err));
    }
  }
  
  
  

  static async deleteLegalitas(req, res, next) {
    try {
      const { id } = req.params;

      const legalitas = await Legalitas.findByPk(id);

      if (!legalitas) throw { name: "InvalidId" };

      await legalitas.destroy();

      res.status(200).json({
        message: "success delete legalitas",
        // data: legalitas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateLegalitas(req, res, next) {
    try {
      const { id } = req.params;

      let companyprofileKey;
      let aktaPendirianKey;
      let suratPengesahanKey;
      let sertifikasiKey;
      let bidangUsahaKey;
      let npwpKey;

      const legalitas = await Legalitas.findByPk(id);

      if (!legalitas) throw { name: "InvalidId" };

      if (req.files) {
        if (req.files.companyProfile) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.companyProfile[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.companyProfile[0].buffer,
            ACL: "public-read",
            ContentType: req.files.companyProfile[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          companyprofileKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
  
        if (req.files.aktaPendirian) {
          const timestamp = new Date().getTime();
          const uniqueFileName = `${timestamp}-${req.files.aktaPendirian[0].originalname}`;
  
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `webnewus/legalitas/${uniqueFileName}`,
            Body: req.files.aktaPendirian[0].buffer,
            ACL: "public-read",
            ContentType: req.files.aktaPendirian[0].mimetype,
          };
  
          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);
  
          aktaPendirianKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }

        if (req.files.suratPengesahan) {
            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}-${req.files.suratPengesahan[0].originalname}`;
    
            const uploadParams = {
              Bucket: process.env.AWS_BUCKET,
              Key: `webnewus/legalitas/${uniqueFileName}`,
              Body: req.files.suratPengesahan[0].buffer,
              ACL: "public-read",
              ContentType: req.files.suratPengesahan[0].mimetype,
            };
    
            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);
    
            suratPengesahanKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }

        if (req.files.sertifikasi) {
            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}-${req.files.sertifikasi[0].originalname}`;
    
            const uploadParams = {
              Bucket: process.env.AWS_BUCKET,
              Key: `webnewus/legalitas/${uniqueFileName}`,
              Body: req.files.sertifikasi[0].buffer,
              ACL: "public-read",
              ContentType: req.files.sertifikasi[0].mimetype,
            };
    
            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);
    
            sertifikasiKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }

        if (req.files.bidangUsaha) {
            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}-${req.files.bidangUsaha[0].originalname}`;
    
            const uploadParams = {
              Bucket: process.env.AWS_BUCKET,
              Key: `webnewus/legalitas/${uniqueFileName}`,
              Body: req.files.bidangUsaha[0].buffer,
              ACL: "public-read",
              ContentType: req.files.bidangUsaha[0].mimetype,
            };
    
            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);
    
            bidangUsahaKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }

        if (req.files.npwp) {
            const timestamp = new Date().getTime();
            const uniqueFileName = `${timestamp}-${req.files.npwp[0].originalname}`;
    
            const uploadParams = {
              Bucket: process.env.AWS_BUCKET,
              Key: `webnewus/legalitas/${uniqueFileName}`,
              Body: req.files.npwp[0].buffer,
              ACL: "public-read",
              ContentType: req.files.npwp[0].mimetype,
            };
    
            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);
    
            npwpKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
        }
      }

      await legalitas.update({
        companyProfile: req.file ? companyprofileKey : undefined,
        aktaPendirian: req.file ? aktaPendirianKey : undefined,
        suratPengesahan: req.file ? suratPengesahanKey : undefined,
        sertifikasi: req.file ? sertifikasiKey : undefined,
        bidangUsaha: req.file ? bidangUsahaKey : undefined,
        npwp: req.file ? npwpKey : undefined
      });

      res.status(200).json({
        message: "success update legalitas",
        data: legalitas,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = LegalitasController;

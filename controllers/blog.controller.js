//kode dari file Blog.controller.js

const { response } = require("../helpers/response.formatter");
const { Blog, Kategoriblog, Tagblog, User } = require("../models");
const slugify = require("slugify");
const Validator = require("fastest-validator");
const fs = require("fs");
const path = require("path");
const v = new Validator();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const response = require('../helpers/response'); 

const s3Client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  }); 

module.exports = {
  //membuat blog
  newBlog: async (req, res) => {
    try {
      const {
        title,
        keyword,
        excerpt,
        body,
        kategoriblog_id,
        tagblog_id,
        publishAt,
        status,
        // TagportofolioId,
        // KategoriportofolioId,
      } = req.body;
  
      let imageKey;
  
      // Handle image upload
      if (req.files && req.files.image) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.files.image[0].originalname}`;
  
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/blog/${uniqueFileName}`,
          Body: req.files.image[0].buffer,
          ACL: 'public-read',
          ContentType: req.files.image[0].mimetype
        };
  
        const command = new PutObjectCommand(uploadParams);
  
        await s3Client.send(command);
  
        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }
  
      const dataCreate = {
        title,
        slug: slugify(title, { lower: true }),
        keyword,
        excerpt,
        body,
        status,
        publishAt,
        kategoriblog_id,
        tagblog_id,
        user_id: data.userId,
        image: req.files && req.files.image ? imageKey : undefined,
      };
  
      const newblog = await Blog.create(dataCreate);
  
      res
        .status(201)
        .json(response(201, 'success create new blog', newblog));
    } catch (err) {
      res.status(500).json(response(500, 'internal server error', err));
      console.log(err);
    }
  },

  //mendapatkan semua data blog
  getblog: async (req, res) => {
    try {
      //mendapatkan data semua blog
      let blogGets = await Blog.findAll({
        include: [
          {
            model: Kategoriblog,
            attributes: ["title", "id"],
            as: "Kategoriblog",
          },
          {
            model: Tagblog,
            attributes: ["title", "id"],
            as: "Tagblog",
          },
          {
            model: User,
            attributes: ["name", "id"],
            as: "User",
          },
        ],
        attributes: { exclude: ["kategoriblog_id", "tagblog_id", "user_id"] },
      });

      let formattedBlogs = blogGets.map((blog) => {
        return {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
          keyword: blog.keyword,
          excerpt: blog.excerpt,
          body: blog.body,
          kategoriblog_id: blog.Kategoriblog?.id, // Menggunakan operator ?. untuk memeriksa keberadaan Kategoriblog
          kategoriblog_title: blog.Kategoriblog?.title,
          tagblog_id: blog.Tagblog?.id, // Menggunakan operator ?. untuk memeriksa keberadaan Tagblog
          tagblog_title: blog.Tagblog?.title,
          user_id: blog.User?.id, // Menggunakan operator ?. untuk memeriksa keberadaan User
          user_title: blog.User?.name,
          image: blog.image,
          status: blog.status,
          status_desc: blog.status === false ? "Draft" : "Published",
          publishAt: blog.publishAt,
          createdAt: blog.createdAt,
          updatedAt: blog.updatedAt,
        };
      });

      //response menggunakan helper response.formatter
      res.status(200).json(response(200, "success get blog", formattedBlogs));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },

  //mendapatkan data blog berdasarkan id
  getblogById: async (req, res) => {
    try {
      //mendapatkan data blog berdasarkan id
      let blogGet = await Blog.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Kategoriblog,
            attributes: ["title", "id"],
            as: "Kategoriblog",
          },
          {
            model: Tagblog,
            attributes: ["title", "id"],
            as: "Tagblog",
          },
          {
            model: User,
            attributes: ["name", "id"],
            as: "User",
          },
        ],
        attributes: { exclude: ["kategoriblog_id", "tagblog_id", "user_id"] },
      });

      //cek jika blog tidak ada
      if (!blogGet) {
        res.status(404).json(response(404, "blog not found"));
        return;
      }

      let formattedBlog = {
        id: blogGet.id,
        title: blogGet.title,
        slug: blogGet.slug,
        keyword: blogGet.keyword,
        excerpt: blogGet.excerpt,
        body: blogGet.body,
        kategoriblog_id: blogGet.Kategoriblog?.id,
        kategoriblog_title: blogGet.Kategoriblog?.title,
        tagblog_id: blogGet.Tagblog?.id,
        tagblog_title: blogGet.Tagblog?.title,
        user_id: blogGet.User?.id,
        user_title: blogGet.User?.name,
        image: blogGet.image,
        status: blogGet.status,
        status_desc: blogGet.status === false ? "Draft" : "Published",
        publishAt: blogGet.publishAt,
        createdAt: blogGet.createdAt,
        updatedAt: blogGet.updatedAt,
      };

      //response menggunakan helper response.formatter
      res
        .status(200)
        .json(response(200, "success get blog by id", formattedBlog));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },

  getBlogBySlug: async (req, res) => {
    try {
      // mendapatkan semua data blog berdasarkan slug
      let blogs = await Blog.findAll({
        where: {
          slug: req.params.slug,
        },
        include: [
          {
            model: Kategoriblog,
            attributes: ["title", "id"],
            as: "Kategoriblog",
          },
          {
            model: Tagblog,
            attributes: ["title", "id"],
            as: "Tagblog",
          },
          {
            model: User,
            attributes: ["name", "id"],
            as: "User",
          },
        ],
        attributes: { exclude: ["kategoriblog_id", "tagblog_id", "user_id"] },
      });

      // cek jika blog tidak ada
      if (blogs.length === 0) {
        res.status(404).json(response(404, "blogs not found"));
        return;
      }

      // format setiap blog yang ditemukan
      let formattedBlogs = blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        keyword: blog.keyword,
        excerpt: blog.excerpt,
        body: blog.body,
        kategoriblog_id: blog.Kategoriblog?.id,
        kategoriblog_title: blog.Kategoriblog?.title,
        tagblog_id: blog.Tagblog?.id,
        tagblog_title: blog.Tagblog?.title,
        user_id: blog.User?.id,
        user_title: blog.User?.name,
        image: blog.image,
        status: blog.status,
        status_desc: blog.status === false ? "Draft" : "Published",
        publishAt: blog.publishAt,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
      }));

      // response menggunakan helper response.formatter
      res
        .status(200)
        .json(response(200, "success get blogs by slug", formattedBlogs));
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },

  //mengupdate blog berdasarkan id
  updateblog: async (req, res, next) => {
    try {
      const { id } = req.params;
      let imageKey;

      const blog = await Blog.findByPk(id);

      if (!blog) throw { name: "InvalidId" };

      if (req.file) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}-${req.file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: `webnewus/blog/${uniqueFileName}`,
          Body: req.file.buffer,
          ACL: 'public-read',
          ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(uploadParams);

        await s3Client.send(command);

        imageKey = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${uploadParams.Key}`;
      }

      await blog.update({
        title: req.body.title,
        slug: slugify(req.body.title, { lower: true }),
        keyword: req.body.keyword,
        excerpt: req.body.excerpt,
        body: req.body.body,
        kategoriblog_id: Number(req.body.kategoriblog_id),
        tagblog_id: Number(req.body.tagblog_id),
        publishAt: req.body.publishAt,
        status: Number(req.body.status),
        image: req.file ? imageKey : blog.image
      });

      res.status(200).json({
        message: "success update blog",
        data: blog,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  //menghapus blog berdasarkan id
  deleteblog: async (req, res) => {
    try {

      //mendapatkan data kategoriblog untuk pengecekan
      let blog = await Blog.findOne({
          where:{
              id : req.params.id
          }
      })

      //cek apakah data kategoriblog ada
      if(!blog){
          res.status(404).json(response(404,'kategoriblog not found'));
          return;
      }

      await Blog.destroy({
          where:{
              id: req.params.id,
          }
      })
      //response menggunakan helper response.formatter
      res.status(200).json(response(200,'success delete blog'));

  } catch (err) {
      res.status(500).json(response(500,'internal server error', err));
      console.log(err);
  }
  },
};

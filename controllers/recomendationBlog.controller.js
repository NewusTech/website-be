const { response } = require("../helpers/response.formatter");
const { Blog, User, RecomendationBlog, Kategoriblog, Tagblog} = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  getRecomendationBlog: async (req, res) => {
    try {
      const recommendations = await RecomendationBlog.findAll({
        include: [
          {
            model: Blog,
            as: 'blog',
            attributes: ['id', 'title', 'slug', 'keyword', 'excerpt', 'body', 'image', 'altImage', 'status', 'publishAt', 'createdAt', 'updatedAt'],
            include: [
              {
                model: Kategoriblog,
                attributes: ['title', 'id'],
                as: 'Kategoriblog'
              },
              {
                model: Tagblog,
                attributes: ['title', 'id'],
                as: 'Tagblog'
              },
              {
                model: User,
                attributes: ['name', 'id'],
                as: 'user'
              }
            ]
          }
        ],
        attributes: { exclude: ['kategoriblog_id', 'tagblog_id', 'user_id'] }
      });
  
      const data = recommendations.map((recommendation) => {
        return {
          recommendationId: recommendation.id,
          status: recommendation.status,
          blogId: recommendation.blog.id,
          title: recommendation.blog.title,
          slug: recommendation.blog.slug,
          keyword: recommendation.blog.keyword,
          excerpt: recommendation.blog.excerpt,
          body: recommendation.blog.body,
          altImage: recommendation.blog.altImage,
          kategoriblog_id: recommendation.blog.Kategoriblog?.id,
          kategoriblog_title: recommendation.blog.Kategoriblog?.title,
          tagblog_id: recommendation.blog.Tagblog?.id,
          tagblog_title: recommendation.blog.Tagblog?.title,
          user_id: recommendation.blog.user?.id,
          user_title: recommendation.blog.user?.name,
          image: recommendation.blog.image,
          status: recommendation.blog.status,
          status_desc: recommendation.blog.status === false ? "Draft" : "Published",
          publishAt: recommendation.blog.publishAt,
          createdAt: recommendation.blog.createdAt,
          updatedAt: recommendation.blog.updatedAt
        };
      });
  
      res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Membuat rekomendasi blog
  createRecomendationBlog : async (req, res) => {
    try {
      // Membuat skema untuk validasi
      // const schema = {
      //   BlogId: { type: "number", integer: true, required: true },
      //   status: { type: "number", integer: true, required: true }
      // };

      // Membuat objek rekomendasi blog
      let recomendationblogCreateObj = {
        BlogId: req.body.BlogId,
        status: req.body.status
      };

      // Validasi menggunakan module fastest-validator
      // const validate = v.validate(recomendationblogCreateObj, schema);
      // if (validate.length > 0) {
      //   res.status(400).json(response(400, 'validation failed', validate));
      //   return;
      // }

      // Buat rekomendasi blog
      let recomendationblogCreate = await RecomendationBlog.create(recomendationblogCreateObj);

      // Response menggunakan helper response.formatter
      res.status(201).json(response(201, 'success create recomendation blog', recomendationblogCreate));
    } catch (err) {
      res.status(500).json(response(500,'internal server error', err));
      console.log(err);
    }
  },

  getBlogRecomendationId: async (req, res) => {
    try {
      // Mendapatkan semua data blog berdasarkan slug
      let recommendations = await RecomendationBlog.findAll({
        where: { id: req.params.id },
        include: [
          {
            model: Blog,
            as: 'blog',
            // attributes: ['id', 'title', 'image', 'webLink'], // Sesuaikan dengan atribut yang ingin ditampilkan
          }
        ]
      });

      res.status(200).json({
        success: true,
        data: recommendations
      });
    } catch (err) {
      res.status(500).json(response(500, "internal server error", err));
      console.log(err);
    }
  },
};

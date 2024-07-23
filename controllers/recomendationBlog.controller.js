const { response } = require("../helpers/response.formatter");
const { Blog, RecomendationBlog} = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  getRecomendationBlog: async (req, res) => {
    const recommendations = await RecomendationBlog.findAll({
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
  },

  // Membuat rekomendasi blog
  createRecomendationBlog : async (req, res) => {
    try {
      // Membuat skema untuk validasi
      const schema = {
        BlogId: { type: "number", integer: true },
        status: { type: "number", integer: true }
      };

      // Membuat objek rekomendasi blog
      let recomendationblogCreateObj = {
        BlogId: req.body.BlogId,
        status: req.body.status
      };

      // Validasi menggunakan module fastest-validator
      const validate = v.validate(recomendationblogCreateObj, schema);
      if (validate.length > 0) {
        res.status(400).json(response(400, 'validation failed', validate));
        return;
      }

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

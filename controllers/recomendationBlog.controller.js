
const { response } = require("../helpers/response.formatter");
const { Blog, RecomendationBlog} = require("../models");
const Validator = require("fastest-validator");
const fs = require("fs");
const path = require("path");
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

  //membuat recomendation
  createRecomendationBlog : async (req,res) => {
    try {

        //membuat schema untuk validasi
        const schema = {
            BlogId: {
                type: "integer",
            },
            status: {
                type: "integer",
            }
        }

        //buat object kategoriblog
        let recomendationblogCreateObj = {
            BlogId: req.body.BlogId,
            status: req.body.status
        }

        //validasi menggunakan module fastest-validator
        const validate = v.validate(recomendationblogCreateObj, schema);
        if (validate.length > 0) {
            res.status(400).json(response(400, 'validation failed', validate));
            return;
        }

        //buat kategoriblog
        let recomendationblogCreate = await RecomendationBlog.create(recomendationblogCreateObj);

        //response menggunakan helper response.formatter
        res.status(201).json(response(201, 'success create recomendation blog', recomendationblogCreate));
    }catch (err) {
        res.status(500).json(response(500,'internal server error', err));
        console.log(err);
    }
  },

  getBlogRecomendationId: async (req, res) => {
    try {
      // mendapatkan semua data blog berdasarkan slug
      let recommendations = await RecomendationBlog.findAll({
        where: {
          id: req.params.id,
        },
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

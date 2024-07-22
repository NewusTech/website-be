const recomendationBlogController = require('../controllers/recomendationBlog.controller');
const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get('/admin/blog/recomendation', recomendationBlogController.getRecomendationBlog);
route.post('/admin/blog/recomendation/create', [mid.isLogin, mid.isLogout], recomendationBlogController.createRecomendationBlog);
route.get("/admin/:slug/blog/recomendation/detail", recomendationBlogController.getBlogRecomendationId);

module.exports = route;
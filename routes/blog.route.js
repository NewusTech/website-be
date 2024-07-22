const blogController = require('../controllers/blog.controller');
const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/admin/blog/create', [mid.isLogin, mid.isLogout], upload.fields([{ name: 'image', maxCount: 1 }]), blogController.newBlog);
route.get('/admin/blog/get', blogController.getblog);
route.get("/admin/:slug/blog/detail", blogController.getBlogBySlug);
route.get('/admin/blog/get/:id', blogController.getblogById);
route.put('/admin/blog/update/:id', [mid.isLogin, mid.isLogout], upload.single('image'), blogController.updateblog);
route.delete('/admin/blog/delete/:id', blogController.deleteblog);


module.exports = route;
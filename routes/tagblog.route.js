//kode dari file tagblog.route.js

//import controller admin.controller.js 
const tagblogController = require('../controllers/tagblog.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

const multer = require('multer');
const upload = multer();

route.post('/admin/tagblog/create', [mid.isLogin, mid.isLogout], tagblogController.createtagblog);
route.get('/admin/tagblog/get', tagblogController.gettagblog);
route.get('/admin/tagblog/get/:id', tagblogController.gettagblogById);
route.put('/admin/tagblog/update/:id', [mid.isLogin, mid.isLogout], tagblogController.updatetagblog);
route.delete('/admin/tagblog/delete/:id', [mid.isLogin, mid.isLogout], tagblogController.deletetagblog);

module.exports = route;
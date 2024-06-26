const blogController = require('../controllers/blog.controller');
const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/blog'); // Tentukan folder penyimpanan
    },
    filename: function (req, file, cb) {
        // Buat nama file baru (Anda bisa menggunakan timestamp, UUID, atau nama asli file)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

route.post('/admin/blog/create', [mid.isLogin, mid.isLogout], upload.single('image'), blogController.createblog);
route.get('/admin/blog/get', blogController.getblog);
route.get('/admin/blog/get/:id', blogController.getblogById);
route.put('/admin/blog/update/:id', [mid.isLogin, mid.isLogout], upload.single('image'), blogController.updateblog);
route.delete('/admin/blog/delete/:id', [mid.isLogin, mid.isLogout], blogController.deleteblog);

module.exports = route;
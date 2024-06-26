const kategoriblogController = require('../controllers/kategoriblog.controller');
const mid = require('../middlewares/auth.middleware');

const express = require('express');
const route = express.Router();

route.post('/admin/kategoriblog/create', [mid.isLogin, mid.isLogout], kategoriblogController.createkategoriblog);
route.get('/admin/kategoriblog/get',  kategoriblogController.getkategoriblog);
route.get('/admin/kategoriblog/get/:id', kategoriblogController.getkategoriblogById);
route.put('/admin/kategoriblog/update/:id', [mid.isLogin, mid.isLogout], kategoriblogController.updatekategoriblog);
route.delete('/admin/kategoriblog/delete/:id', [mid.isLogin, mid.isLogout], kategoriblogController.deletekategoriblog);

module.exports = route;
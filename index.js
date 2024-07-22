//kode dari file index.js

//import config
const baseConfig =  require('./config/base.config');

//import cors
const cors = require('cors');

//import express
const express = require('express')
const error = require('./errorHandler/errorHandler')
const app = express();
const port = 8000;
const urlApi = "/api";

// Mengaktifkan CORS untuk semua permintaan
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//memanggil route pada routes\api.route.js
require('./routes/api.route')(app,urlApi);

app.use(error)

//listen
app.listen(port, () => {
    console.log(`server is running on port ${port} and url ${baseConfig.base_url}`);
});

const baseConfig = require('./config/base.config');
const cors = require('cors');
const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const error = require('./errorHandler/errorHandler');

const app = express();
const port = 3001;
const urlApi = "/api";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyimpan rute dalam Set untuk menghindari duplikasi
const routes = new Set();

// Middleware untuk menyimpan rute
app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.includes('sitemap.xml')) {
        const fullPath = `${req.path}`;
        if (!routes.has(fullPath)) {
            routes.add(fullPath);
            console.log(`Route added: ${fullPath}`);
        }
    }
    next();
});

// Memanggil route pada routes/api.route.js
require('./routes/api.route')(app, urlApi);

// Endpoint untuk memeriksa semua rute yang ada
app.get('/check-routes', (req, res) => {
    res.json({ routes: Array.from(routes) });
});

// Route untuk sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
    try {
        // Buat link dari rute
        const links = Array.from(routes).map(route => ({
            url: baseConfig.base_url + route,
            changefreq: 'daily',
            priority: 0.8
        }));

        console.log('Links for sitemap:', links); // Tambahkan log untuk memeriksa data

        if (links.length === 0) {
            res.status(200).send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
            return;
        }

        const stream = new SitemapStream({ hostname: baseConfig.base_url });
        const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

        res.header('Content-Type', 'application/xml');
        res.send(xmlString);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).end();
    }
});

app.use(error);

app.listen(port, () => {
    console.log(`Server is running on port ${port} and url ${baseConfig.base_url}`);
});

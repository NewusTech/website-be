const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    // Daftar URL yang ingin Anda sertakan dalam sitemap
    const links = [
      { url: '/', changefreq: 'daily', priority: 0.8 },
      { url: '/about', changefreq: 'monthly', priority: 0.7 },
      { url: '/contact', changefreq: 'monthly', priority: 0.7 },
      // Tambahkan lebih banyak URL di sini
    ];

    // Membuat sitemap
    const stream = new SitemapStream({ hostname: 'https://example.com' });

    res.header('Content-Type', 'application/xml');
    res.header('Cache-Control', 'public, max-age=3600');

    // Menulis URL ke stream
    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) => data.toString());

    // Kirim sitemap sebagai respons
    res.send(xml);
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;

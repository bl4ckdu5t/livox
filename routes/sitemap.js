const sm = require('sitemap');

const sitemap = sm.createSitemap({
  hostname: 'http://getjama.com',
  cacheTime: 600000,
  urls: [
    { url: '/', changefreq: 'monthly', priority: 0.7 },
    { url: '/auth', changefreq: 'monthly', priority: 0.5 },
    { url: '/tos', changefreq: 'monthly', priority: 0.5 },
    { url: '/solutions', changefreq: 'monthly', priority: 0.5 }
  ]
});

module.exports = (req, res) => {
  sitemap.toXML( function (err, xml) {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send( xml );
  });
};

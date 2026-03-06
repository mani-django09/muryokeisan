const fs = require('fs');
const path = require('path');

const baseUrl = 'https://muryokeisan.com';

const pages = [
{ path: '', priority: '1.0', changefreq: 'daily' },
{ path: '/bmi-keisan', priority: '0.9', changefreq: 'weekly' },
{ path: '/tax-keisan', priority: '0.9', changefreq: 'weekly' },
{ path: '/days-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/time-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/percentage-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/body-fat-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/due-date-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/discount-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/age-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/property-tax-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/income-tax-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/wage-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/unemployment-keisan', priority: '0.8', changefreq: 'weekly' },
{ path: '/privacy', priority: '0.3', changefreq: 'monthly' },
{ path: '/terms', priority: '0.3', changefreq: 'monthly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url> <loc>${baseUrl}${page.path}</loc> <changefreq>${page.changefreq}</changefreq> <priority>${page.priority}</priority> <lastmod>${new Date().toISOString().split('T')[0]}</lastmod> </url>`).join('\n')} </urlset>`;

const publicDir = path.join(__dirname, '..', 'public');

if (!fs.existsSync(publicDir)) {
fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

console.log('Sitemap generated successfully');

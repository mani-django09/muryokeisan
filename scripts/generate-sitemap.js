<<<<<<< HEAD
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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully at public/sitemap.xml');
=======
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_BASE_URL || 'https://muryokeisan.com';

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/bmi-keisan', priority: '0.9', changefreq: 'monthly' },
  { path: '/tax-keisan', priority: '0.9', changefreq: 'monthly' },
  { path: '/days-keisan', priority: '0.8', changefreq: 'monthly' },
  { path: '/time-keisan', priority: '0.8', changefreq: 'monthly' },
  { path: '/percentage-keisan', priority: '0.8', changefreq: 'monthly' },
  { path: '/body-fat-keisan', priority: '0.8', changefreq: 'monthly' },
  { path: '/due-date-keisan', priority: '0.8', changefreq: 'monthly' },
  { path: '/discount-keisan', priority: '0.8', changefreq: 'monthly' },
  { path: '/age-keisan', priority: '0.8', changefreq: 'monthly' },
  { path: '/property-tax-keisan', priority: '0.9', changefreq: 'monthly' },
  { path: '/income-tax-keisan', priority: '0.9', changefreq: 'monthly' },
  { path: '/wage-keisan', priority: '0.9', changefreq: 'monthly' },
  { path: '/unemployment-keisan', priority: '0.9', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

const currentDate = new Date().toISOString().split('T')[0];

const generateSitemap = () => {
  const urls = routes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const outputPath = path.join(__dirname, '../client/public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  console.log(`Sitemap generated successfully at ${outputPath}`);
};

generateSitemap();
>>>>>>> c32eea3ed9905f2ada461d622e9daecd594d0f91

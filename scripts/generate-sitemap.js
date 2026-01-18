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

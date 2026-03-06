# MuryoKeisan - Japanese Calculator Portal

Production-ready Next.js 14 App Router website with Express REST API backend featuring 14 Japanese calculator tools optimized for SEO.

## Features

- **Next.js 14 App Router** with Server-Side Rendering (SSR) for optimal SEO
- **Express REST API** backend with 14 calculation endpoints
- **Tailwind CSS** for responsive, mobile-first design
- **Japanese SEO optimization** with meta tags, JSON-LD schema, and rich content
- **14 Calculator Tools**:
  - BMI計算 (BMI Calculator)
  - 消費税計算 (Tax Calculator)
  - 日数計算 (Days Calculator)
  - 時間計算 (Time Calculator)
  - パーセント計算 (Percentage Calculator)
  - 体脂肪率計算 (Body Fat Calculator)
  - 出産予定日計算 (Due Date Calculator)
  - 割引計算 (Discount Calculator)
  - 年齢計算 (Age Calculator)
  - 固定資産税計算 (Property Tax Calculator)
  - 所得税計算 (Income Tax Calculator)
  - 時給計算 (Wage Calculator)
  - 失業保険計算 (Unemployment Insurance Calculator)

## Project Structure

```
nextjs-calculator/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with Japanese fonts
│   │   ├── page.tsx            # Homepage with calculator grid
│   │   ├── bmi-keisan/         # BMI calculator page
│   │   ├── tax-keisan/         # Tax calculator page
│   │   └── ...                 # Other calculator pages
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FAQ.tsx
│   │   └── CalculatorClient.tsx
│   └── lib/                    # Utility functions
├── api/
│   └── server.js               # Express API server
├── public/                     # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Port 3000 (Next.js) and 4000 (API) available

### Setup Steps

1. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Start the API server** (in one terminal):
```bash
npm run api
```

3. **Start the Next.js development server** (in another terminal):
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:3000`

## Production Deployment

### Option 1: VPS Deployment (Recommended)

#### Requirements
- Ubuntu 20.04+ VPS
- Domain name (e.g., muryokeisan.com)
- Root or sudo access

#### Step 1: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Step 2: Install PM2
```bash
sudo npm install -g pm2
```

#### Step 3: Clone and Setup Project
```bash
cd /var/www
# Upload your project files here
cd nextjs-calculator
npm install
npm run build
```

#### Step 4: Create PM2 Ecosystem File
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/nextjs-calculator',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'api-server',
      script: 'api/server.js',
      cwd: '/var/www/nextjs-calculator',
      env: {
        NODE_ENV: 'production',
        API_PORT: 4000,
      },
    },
  ],
};
```

#### Step 5: Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 6: Install and Configure Nginx
```bash
sudo apt-get install -y nginx
```

Create Nginx configuration `/etc/nginx/sites-available/muryokeisan`:
```nginx
server {
    listen 80;
    server_name muryokeisan.com www.muryokeisan.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/muryokeisan /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 7: Setup SSL with Let's Encrypt
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d muryokeisan.com -d www.muryokeisan.com
```

### Option 2: Vercel Deployment (Next.js only)

**Note**: This option deploys only the Next.js frontend. You'll need separate hosting for the Express API.

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Update `next.config.js` to point API calls to your hosted API server.

### Option 3: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000 4000

CMD ["sh", "-c", "node api/server.js & npm start"]
```

Build and run:
```bash
docker build -t muryokeisan .
docker run -p 3000:3000 -p 4000:4000 muryokeisan
```

## SEO Optimization

### Sitemap Generation

Create `scripts/generate-sitemap.js`:
```javascript
const fs = require('fs');

const baseUrl = 'https://muryokeisan.com';
const pages = [
  '',
  '/bmi-keisan',
  '/tax-keisan',
  '/days-keisan',
  '/time-keisan',
  '/percentage-keisan',
  '/body-fat-keisan',
  '/due-date-keisan',
  '/discount-keisan',
  '/age-keisan',
  '/property-tax-keisan',
  '/income-tax-keisan',
  '/wage-keisan',
  '/unemployment-keisan',
  '/privacy',
  '/terms',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully!');
```

Run after deployment:
```bash
node scripts/generate-sitemap.js
```

### robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://muryokeisan.com/sitemap.xml
```

## Environment Variables

Create `.env.local` for local development:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For production, update to your domain:
```
NEXT_PUBLIC_API_URL=https://muryokeisan.com
```

## Maintenance

### Monitoring with PM2
```bash
pm2 status
pm2 logs
pm2 monit
```

### Restart Services
```bash
pm2 restart all
```

### Update Application
```bash
cd /var/www/nextjs-calculator
git pull  # or upload new files
npm install
npm run build
pm2 restart all
```

## Performance Optimization

- Enable Nginx gzip compression
- Configure browser caching
- Use CDN for static assets
- Enable Next.js Image Optimization
- Monitor with Google PageSpeed Insights

## Support

For issues or questions, please refer to:
- Next.js Documentation: https://nextjs.org/docs
- Express Documentation: https://expressjs.com/

## License

MIT License - feel free to use for commercial projects.

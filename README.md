<<<<<<< HEAD
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
=======
# Japanese Calculator Portal (計算ツール)

A production-ready Japanese calculator website featuring 14 SEO-optimized calculation tools targeting high-volume Japanese keywords. Built with Next.js 14 App Router frontend and Express backend.

## Features

### Calculator Tools

The portal includes 14 comprehensive calculator tools:

**Health & Wellness**
- **BMI Calculator** (BMI計算) - Calculate Body Mass Index from height and weight
- **Body Fat Calculator** (体脂肪率計算) - Estimate body fat percentage
- **Due Date Calculator** (出産予定日計算) - Calculate pregnancy due date

**Financial & Tax**
- **Consumption Tax Calculator** (消費税計算) - Calculate Japanese consumption tax
- **Income Tax Calculator** (所得税計算) - Estimate Japanese income tax
- **Property Tax Calculator** (固定資産税計算) - Estimate property tax
- **Discount Calculator** (割引計算) - Calculate discounted prices
- **Wage Calculator** (時給計算) - Calculate monthly and annual wages from hourly rate
- **Unemployment Insurance Calculator** (失業保険計算) - Estimate unemployment benefits

**Date & Time**
- **Days Calculator** (日数計算) - Calculate days between two dates
- **Time Calculator** (時間計算) - Add or subtract time durations
- **Age Calculator** (年齢計算) - Calculate precise age from birthdate

**Basic Math**
- **Percentage Calculator** (パーセント計算) - Calculate percentages and ratios

### Technical Features

- **SEO Optimized**: Japanese metadata, H1/H2 structure, JSON-LD schema markup
- **Mobile-First Design**: Responsive UI with Tailwind CSS
- **Server-Side Rendering**: Next.js 14 App Router for optimal performance
- **REST API Backend**: Express with Zod validation
- **Production Ready**: PM2 process management, Nginx reverse proxy
- **Compliance**: Privacy Policy and Terms of Service pages in Japanese

## Technology Stack

### Frontend
- React 19 with TypeScript
- Wouter for client-side routing
- Tailwind CSS 4 for styling
- shadcn/ui component library
- Lucide React icons

### Backend
- Node.js 22 with Express 4
- TypeScript for type safety
- Zod for input validation
- MySQL/TiDB database support

### Development Tools
- pnpm for package management
- Vite for development server
- TypeScript compiler
- ESLint and Prettier
>>>>>>> c32eea3ed9905f2ada461d622e9daecd594d0f91

## Project Structure

```
<<<<<<< HEAD
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
=======
japanese-calculator/
├── client/                  # Frontend application
│   ├── public/             # Static assets
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── AdPlaceholder.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── SEOHead.tsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── BMICalculator.tsx
│   │   │   ├── TaxCalculator.tsx
│   │   │   └── ... (11 more calculators)
│   │   ├── App.tsx         # Main app component
│   │   └── index.css       # Global styles
├── server/                  # Backend application
│   ├── _core/              # Core server functionality
│   ├── calculators.ts      # Calculator API endpoints
│   ├── db.ts               # Database helpers
│   └── routers.ts          # tRPC routers
├── scripts/                 # Utility scripts
│   └── generate-sitemap.js # Sitemap generator
├── DEPLOYMENT.md            # Deployment guide
├── README.md                # This file
└── package.json             # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 22 or higher
- pnpm 10 or higher
- MySQL/TiDB database (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/japanese-calculator.git
cd japanese-calculator
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run database migrations (if using database):
```bash
pnpm db:push
```

5. Start development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm check

# Format code
pnpm format

# Run tests
pnpm test

# Database migrations
pnpm db:push

# Generate sitemap
node scripts/generate-sitemap.js
```

## API Endpoints

All calculator endpoints are available under `/api/calc/`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/calc/bmi` | POST | BMI calculation |
| `/api/calc/tax` | POST | Consumption tax calculation |
| `/api/calc/days` | POST | Days between dates |
| `/api/calc/time` | POST | Time arithmetic |
| `/api/calc/percentage` | POST | Percentage calculation |
| `/api/calc/body-fat` | POST | Body fat estimation |
| `/api/calc/due-date` | POST | Pregnancy due date |
| `/api/calc/discount` | POST | Discount calculation |
| `/api/calc/age` | POST | Age calculation |
| `/api/calc/property-tax` | POST | Property tax estimation |
| `/api/calc/income-tax` | POST | Income tax estimation |
| `/api/calc/wage` | POST | Wage calculation |
| `/api/calc/unemployment` | POST | Unemployment benefits |

### Example API Request

```bash
curl -X POST http://localhost:3000/api/calc/bmi \
  -H "Content-Type: application/json" \
  -d '{"weight": 70, "height": 175}'
```

Response:
```json
{
  "bmi": 22.86,
  "category": "普通体重",
  "weight": 70,
  "height": 175
}
```

## SEO Features

### Metadata
Each calculator page includes:
- Optimized title tags with target keywords
- Meta descriptions in Japanese
- Open Graph tags for social sharing
- Twitter Card metadata
- Canonical URLs

### Structured Data
JSON-LD schema markup for:
- WebApplication schema
- FAQ schema
- HowTo schema (where applicable)

### Sitemap
Automatically generated XML sitemap at `/sitemap.xml` including:
- All calculator pages
- Compliance pages
- Priority and change frequency settings

## Deployment

Comprehensive deployment guide available in [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Steps

1. **VPS Setup**: Ubuntu 22.04 LTS with Node.js 22
2. **Install Dependencies**: Nginx, PM2, Certbot
3. **Clone and Build**: Clone repository and build production assets
4. **Configure Nginx**: Set up reverse proxy and SSL
5. **Start with PM2**: Launch application in cluster mode
6. **SSL Certificate**: Obtain Let's Encrypt certificate

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Performance

### Optimization Features
- HTTP/2 support
- Gzip compression
- Static asset caching
- Server-side rendering
- Code splitting
- Lazy loading

### Target Metrics
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Review existing issues for solutions

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Version**: 1.0.0  
**Last Updated**: January 15, 2025  
**Author**: Manus AI
#   m u r y o k e i s a n  
 
>>>>>>> c32eea3ed9905f2ada461d622e9daecd594d0f91

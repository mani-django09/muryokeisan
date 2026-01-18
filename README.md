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

## Project Structure

```
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
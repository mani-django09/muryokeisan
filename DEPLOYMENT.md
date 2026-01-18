# Japanese Calculator Portal - Deployment Guide

This comprehensive guide covers deploying the Japanese Calculator Portal to a production VPS environment using Nginx as a reverse proxy and PM2 as the process manager.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [VPS Setup](#vps-setup)
3. [Application Deployment](#application-deployment)
4. [Nginx Configuration](#nginx-configuration)
5. [PM2 Process Management](#pm2-process-management)
6. [SSL Certificate Setup](#ssl-certificate-setup)
7. [Performance Optimization](#performance-optimization)
8. [Monitoring and Maintenance](#monitoring-and-maintenance)

## Prerequisites

Before beginning the deployment process, ensure you have the following resources and access credentials prepared:

**Server Requirements**
- Ubuntu 22.04 LTS or newer (recommended)
- Minimum 2GB RAM
- 20GB disk space
- Root or sudo access
- Domain name pointed to server IP

**Local Requirements**
- Git installed
- SSH key configured for server access
- Domain DNS configured (A record pointing to server IP)

## VPS Setup

### Initial Server Configuration

Connect to your VPS via SSH and perform the initial system setup:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential build tools
sudo apt install -y build-essential curl git

# Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### Install Node.js

Install Node.js 22.x using the official NodeSource repository:

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v22.x.x
npm --version
```

### Install pnpm

Install pnpm globally as the package manager:

```bash
# Install pnpm
sudo npm install -g pnpm

# Verify installation
pnpm --version
```

### Install Nginx

Install and enable Nginx web server:

```bash
# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify Nginx is running
sudo systemctl status nginx
```

### Install PM2

Install PM2 globally for process management:

```bash
# Install PM2
sudo npm install -g pm2

# Configure PM2 to start on system boot
pm2 startup systemd
# Follow the command output instructions

# Verify installation
pm2 --version
```

## Application Deployment

### Clone Repository

Create a deployment directory and clone your repository:

```bash
# Create application directory
sudo mkdir -p /var/www
cd /var/www

# Clone repository (replace with your repository URL)
sudo git clone https://github.com/yourusername/japanese-calculator.git
cd japanese-calculator

# Set proper ownership
sudo chown -R $USER:$USER /var/www/japanese-calculator
```

### Environment Configuration

Create and configure the production environment file:

```bash
# Create .env file
nano .env
```

Add the following environment variables (adjust values as needed):

```env
# Node Environment
NODE_ENV=production
PORT=3000

# Database Configuration
DATABASE_URL=mysql://user:password@localhost:3306/calculator_db

# JWT Secret (generate a strong random string)
JWT_SECRET=your-secure-jwt-secret-here

# OAuth Configuration (if using Manus OAuth)
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=your-app-id

# Application Configuration
VITE_APP_TITLE=計算ツール
VITE_BASE_URL=https://yourdomain.com

# API Keys (if needed)
BUILT_IN_FORGE_API_KEY=your-api-key
BUILT_IN_FORGE_API_URL=https://api.manus.im
```

### Install Dependencies

Install all project dependencies:

```bash
# Install dependencies
pnpm install

# Generate database migrations (if using database)
pnpm db:push
```

### Build Application

Build the production-ready application:

```bash
# Build frontend and backend
pnpm build

# Verify build output
ls -la dist/
```

### Generate Sitemap

Generate the sitemap for SEO:

```bash
# Run sitemap generation script
node scripts/generate-sitemap.js

# Verify sitemap was created
ls -la client/public/sitemap.xml
```

## Nginx Configuration

### Create Nginx Configuration File

Create a new Nginx configuration for your application:

```bash
sudo nano /etc/nginx/sites-available/japanese-calculator
```

Add the following configuration (replace `yourdomain.com` with your actual domain):

```nginx
# Upstream configuration for Node.js application
upstream japanese_calculator_app {
    server 127.0.0.1:3000;
    keepalive 64;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect all HTTP traffic to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS server configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificate paths (will be configured by Certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Root directory for static files
    root /var/www/japanese-calculator/dist/client;
    index index.html;

    # Static file caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Sitemap and robots.txt
    location = /sitemap.xml {
        alias /var/www/japanese-calculator/client/public/sitemap.xml;
        add_header Content-Type application/xml;
    }

    location = /robots.txt {
        alias /var/www/japanese-calculator/client/public/robots.txt;
        add_header Content-Type text/plain;
    }

    # API proxy to Node.js application
    location /api/ {
        proxy_pass http://japanese_calculator_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    # Frontend routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;

    # Access and error logs
    access_log /var/log/nginx/japanese-calculator-access.log;
    error_log /var/log/nginx/japanese-calculator-error.log;
}
```

### Enable Nginx Configuration

Enable the configuration and test:

```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/japanese-calculator /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## PM2 Process Management

### Create PM2 Ecosystem File

Create a PM2 ecosystem configuration file:

```bash
nano ecosystem.config.cjs
```

Add the following configuration:

```javascript
module.exports = {
  apps: [{
    name: 'japanese-calculator',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10
  }]
};
```

### Start Application with PM2

Start and manage the application:

```bash
# Create logs directory
mkdir -p logs

# Start application
pm2 start ecosystem.config.cjs

# Save PM2 process list
pm2 save

# View application status
pm2 status

# View logs
pm2 logs japanese-calculator

# Monitor resources
pm2 monit
```

### PM2 Management Commands

Useful PM2 commands for managing your application:

```bash
# Restart application
pm2 restart japanese-calculator

# Stop application
pm2 stop japanese-calculator

# Delete application from PM2
pm2 delete japanese-calculator

# View detailed information
pm2 show japanese-calculator

# Flush logs
pm2 flush

# Reload application (zero-downtime)
pm2 reload japanese-calculator
```

## SSL Certificate Setup

### Install Certbot

Install Certbot for Let's Encrypt SSL certificates:

```bash
# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts to complete certificate installation
```

### Auto-renewal Configuration

Certbot automatically configures certificate renewal. Verify the renewal process:

```bash
# Test renewal process
sudo certbot renew --dry-run

# Check renewal timer
sudo systemctl status certbot.timer
```

## Performance Optimization

### Enable HTTP/2

HTTP/2 is already enabled in the Nginx configuration above. Verify it is working:

```bash
curl -I --http2 https://yourdomain.com
```

### Configure Node.js Production Settings

Ensure your application runs with production optimizations:

```bash
# Set NODE_ENV in .env file
NODE_ENV=production

# Restart PM2 application
pm2 restart japanese-calculator
```

### Database Optimization

If using a database, optimize connection pooling and query performance:

```javascript
// In your database configuration
{
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true
}
```

## Monitoring and Maintenance

### Setup PM2 Monitoring

Enable PM2 monitoring dashboard:

```bash
# Link PM2 to monitoring service (optional)
pm2 link <secret_key> <public_key>

# Or use PM2 web interface
pm2 web
```

### Log Management

Configure log rotation to prevent disk space issues:

```bash
# Install PM2 log rotate module
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

### Nginx Log Rotation

Nginx logs are automatically rotated by logrotate. Verify configuration:

```bash
cat /etc/logrotate.d/nginx
```

### Backup Strategy

Implement regular backups:

```bash
# Create backup script
nano /var/www/backup.sh
```

Add backup script content:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/japanese-calculator"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/japanese-calculator

# Backup database (if applicable)
mysqldump -u user -p database_name > $BACKUP_DIR/db_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

Make the script executable and add to cron:

```bash
chmod +x /var/www/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add line: 0 2 * * * /var/www/backup.sh
```

### Health Check Endpoint

Add a health check endpoint to your application for monitoring:

```javascript
// In server/_core/index.ts
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
```

### Monitoring with PM2

Monitor application health:

```bash
# Check application status
pm2 status

# Monitor CPU and memory
pm2 monit

# View logs in real-time
pm2 logs --lines 100
```

## Deployment Checklist

Before going live, verify the following items:

- [ ] Environment variables configured correctly
- [ ] Database connection working
- [ ] SSL certificate installed and auto-renewal configured
- [ ] Nginx configuration tested and reloaded
- [ ] PM2 application running in cluster mode
- [ ] Sitemap generated and accessible
- [ ] Robots.txt configured
- [ ] Firewall rules configured
- [ ] Backup script configured and tested
- [ ] Monitoring and logging configured
- [ ] Domain DNS properly configured
- [ ] All calculator endpoints tested
- [ ] SEO metadata verified
- [ ] Mobile responsiveness tested
- [ ] Performance optimization applied

## Troubleshooting

### Application Not Starting

Check PM2 logs for errors:

```bash
pm2 logs japanese-calculator --err
```

### Nginx 502 Bad Gateway

Verify Node.js application is running:

```bash
pm2 status
curl http://localhost:3000/health
```

### SSL Certificate Issues

Renew certificate manually:

```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

### High Memory Usage

Restart PM2 application:

```bash
pm2 restart japanese-calculator
```

Check for memory leaks in application code.

## Updates and Maintenance

### Deploying Updates

To deploy application updates:

```bash
cd /var/www/japanese-calculator

# Pull latest changes
git pull origin main

# Install dependencies
pnpm install

# Rebuild application
pnpm build

# Reload PM2 (zero-downtime)
pm2 reload japanese-calculator

# Verify deployment
pm2 status
```

### Database Migrations

If database schema changes:

```bash
# Run migrations
pnpm db:push

# Restart application
pm2 restart japanese-calculator
```

## Support and Resources

For additional support and resources:

- **PM2 Documentation**: https://pm2.keymetrics.io/docs/usage/quick-start/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices

---

**Deployment Guide Version**: 1.0  
**Last Updated**: January 15, 2025  
**Author**: Manus AI

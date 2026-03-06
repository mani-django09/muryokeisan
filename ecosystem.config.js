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
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'api-server',
      script: 'api/server.js',
      cwd: '/var/www/nextjs-calculator',
      env: {
        NODE_ENV: 'production',
        API_PORT: 4000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};

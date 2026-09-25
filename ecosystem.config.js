module.exports = {
  apps: [
    {
      name: "front", // PM2 process name
      script: "node_modules/next/dist/bin/next", // Next.js executable
      args: "start -p 3000", // Port (change if needed)
      cwd: "/var/www/debarras/front", // Working directory

      env: {
        NODE_ENV: "production", // Environment
        PORT: 3000,
      },

      instances: 1, // Or "max" for cluster mode
      autorestart: true,
      watch: false, // Do NOT watch in production
      max_memory_restart: "500M",

      out_file: "/var/www/debarras/front/logs/front-out.log",
      error_file: "/var/www/debarras/front/logs/front-error.log",
      merge_logs: true,
    },
  ],
};
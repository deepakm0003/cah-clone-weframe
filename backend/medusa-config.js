const { loadEnv, defineConfig } = require('@medusajs/framework/utils')
const path = require('path')
const fs = require('fs')

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Force load .env from the current directory if DATABASE_URL looks like a default
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('sqlite')) {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    console.log('Medusa Config: Forcing .env load from', envPath);
    const envConfig = require('dotenv').parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }
}

console.log('Medusa Config: CWD is', process.cwd());
console.log('Medusa Config: DATABASE_URL is now', process.env.DATABASE_URL);

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || 'http://localhost:3000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:9000',
      authCors: process.env.AUTH_CORS || 'http://localhost:3000',
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
    disable: false,
    path: '/app',
  },
})


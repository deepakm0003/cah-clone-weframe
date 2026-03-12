import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { FAQs } from './collections/FAQs'
import { Homepage } from './collections/Homepage'
import { FooterGlobal } from './collections/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- CAH CMS',
    },
  },
  collections: [Users, Media, Products, FAQs],
  globals: [Homepage, FooterGlobal],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'cah-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://your-frontend.vercel.app',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://your-frontend.vercel.app',
  ],
  plugins: [],
  // Sync products to Medusa after create/update
  hooks: {},
})

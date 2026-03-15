import { loadEnvConfig } from '@next/env'
import { getPayload } from 'payload'
import configPromise from './src/payload.config.ts'

const { parsed } = loadEnvConfig(process.cwd())

async function initializeDb() {
  console.log('Using DATABASE_URL:', parsed?.DATABASE_URL?.substring(0, 30) + '...')
  try {
    const payload = await getPayload({
      config: configPromise,
    })
    console.log('Database initialized successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Initialization failed:', error)
    process.exit(1)
  }
}

initializeDb()

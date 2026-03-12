import type { CollectionConfig } from 'payload'
import { syncProductToMedusa } from '../hooks/syncToMedusa'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'price', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [syncProductToMedusa],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. more-cah',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'bullets',
      type: 'array',
      label: 'Bullet Points',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'EUR',
      options: ['USD', 'EUR', 'GBP'],
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'thumbnailImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isNew',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'medusaProductId',
      type: 'text',
      admin: {
        description: 'Auto-synced from Medusa.js. Do not edit manually.',
        readOnly: true,
      },
    },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
  ],
}

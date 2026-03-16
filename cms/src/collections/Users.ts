import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
    admin: ({ req: { user } }) => !!user,
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

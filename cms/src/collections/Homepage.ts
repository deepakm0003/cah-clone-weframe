import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Cards Against Humanity',
    },
    {
      name: 'heroTagline',
      type: 'text',
      defaultValue: 'A party game for horrible people.',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue: 'Unlike most of the party games you\'ve played before, Cards Against Humanity is as despicable and awkward as you and your friends.',
    },
    {
      name: 'heroCta',
      type: 'group',
      label: 'Hero Call to Action',
      fields: [
        { name: 'buyLabel', type: 'text', defaultValue: 'Buy the game.' },
        { name: 'buyLink', type: 'text', defaultValue: '/products/more-cah' },
        { name: 'stealLabel', type: 'text', defaultValue: 'Steal the game.' },
        { name: 'stealLink', type: 'text', defaultValue: '#downloads' },
      ],
    },
    {
      name: 'featuredProducts',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: 'relationship' as any,
      relationTo: 'products' as any,
      hasMany: true,
      label: 'Products to show in hero/featured sections',
    },
    {
      name: 'stuffWeHaveDone',
      type: 'array',
      label: 'Stuff We\'ve Done Section',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'link', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'emailSignupHeading',
      type: 'text',
      defaultValue: 'To find out first when we release new stuff, give us your email:',
    },
  ],
}

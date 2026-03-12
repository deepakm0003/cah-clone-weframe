import type { GlobalConfig } from 'payload'

const linkFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'href', type: 'text' as const, required: true },
]

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'shopLinks',
      type: 'array',
      label: 'Shop Links',
      defaultValue: [
        { label: 'All Products', href: 'https://www.cardsagainsthumanity.com/shop/all' },
        { label: 'Main Games', href: 'https://www.cardsagainsthumanity.com/shop/main-games' },
        { label: 'Expansions', href: 'https://www.cardsagainsthumanity.com/shop/expansions' },
        { label: 'Family', href: 'https://www.cardsagainsthumanity.com/shop/family' },
        { label: 'Packs', href: 'https://www.cardsagainsthumanity.com/shop/packs' },
        { label: 'Other Stuff', href: 'https://www.cardsagainsthumanity.com/shop/other-stuff' },
      ],
      fields: linkFields,
    },
    {
      name: 'infoLinks',
      type: 'array',
      label: 'Info Links',
      defaultValue: [
        { label: 'About', href: 'https://www.cardsagainsthumanity.com/about' },
        { label: 'Support', href: 'https://www.cardsagainsthumanity.com/support' },
        { label: 'Contact', href: 'https://www.cardsagainsthumanity.com/contact' },
        { label: 'Retailers', href: 'https://www.cardsagainsthumanity.com/retailers' },
        { label: 'Steal', href: 'https://www.cardsagainsthumanity.com/#downloads' },
        { label: 'Careers', href: 'https://www.cardsagainsthumanity.com/careers' },
      ],
      fields: linkFields,
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Find Us / Social Links',
      defaultValue: [
        { label: 'Facebook', href: 'https://www.facebook.com/CardsAgainstHumanity' },
        { label: 'Instagram', href: 'https://instagram.com/cardsagainsthumanity' },
        { label: 'TikTok', href: 'https://www.tiktok.com/@cardsagainsthumanity' },
        { label: 'Bluesky', href: 'https://bsky.app/profile/cardsagainsthumanity.com' },
        { label: 'Amazon', href: 'https://www.amazon.com/stores/page/66E40BA9-1C4A-4686-BEFB-55B94789694E' },
        { label: 'Target', href: 'https://www.target.com/s?searchTerm=cards+against+humanity' },
      ],
      fields: linkFields,
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      defaultValue: [
        { label: 'Terms of Use', href: 'https://www.cardsagainsthumanity.com/terms-of-use' },
        { label: 'Privacy Policy', href: 'https://www.cardsagainsthumanity.com/privacy-policy' },
        { label: 'Submission Terms', href: 'https://www.cardsagainsthumanity.com/submission-terms' },
      ],
      fields: linkFields,
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '©2026 Cards Against Humanity LLC',
    },
    {
      name: 'emailSignupText',
      type: 'text',
      defaultValue: "Sign up and we'll let you know first when we do anything:",
    },
  ],
}

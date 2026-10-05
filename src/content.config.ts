import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content collections. Every collection here is editable in Sveltia CMS (/admin).
 * Field names must stay in sync with public/admin/config.yml.
 */

export const PILLARS = ['People', 'Place', 'Prosperity', 'Together'] as const;
export const REGIONS = [
  'Stone Town & West',
  'North',
  'North-East',
  'South-East',
  'Pemba',
  'Beyond Zanzibar',
] as const;
export const AFFILIATE_LEVELS = ['Standard', 'Preferred', 'Corporate', 'Strategic', 'Principal'] as const;
export const BUSINESS_TYPES = [
  'Food & beverage / supplies',
  'Hotel equipment / OS&E / FF&E',
  'Technology / PMS / booking / payments',
  'Transport / logistics / aviation',
  'Tour operator / DMC / experiences',
  'Professional / legal / finance / insurance',
  'Construction / engineering / maintenance',
  'Energy / water / sustainability',
  'Training / recruitment / HR',
  'Media / marketing / communications',
  'Wellness / spa / amenities',
  'Other',
] as const;

/** Sveltia CMS may write empty strings or null for empty optional fields: treat them as absent. */
const opt = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), schema.optional());

const optionalUrl = opt(z.url());

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string(),
      pillar: opt(z.enum(PILLARS)),
      image: opt(image()),
      imageAlt: opt(z.string()),
      draft: z.boolean().default(false),
    }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    start: z.coerce.date(),
    end: opt(z.coerce.date()),
    location: z.string(),
    format: z.enum(['HAZ Hotel Forum', 'Working group', 'Summit', 'Awards', 'Training', 'Partner event', 'Other']),
    excerpt: z.string(),
    membersOnly: z.boolean().default(false),
    registrationUrl: optionalUrl,
    draft: z.boolean().default(false),
  }),
});

const pulse = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pulse' }),
  schema: z.object({
    title: z.string(),
    week: z.number().int().min(1).max(53),
    date: z.coerce.date(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

const positions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/positions' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    topic: z.enum(['Water', 'Waste', 'Power', 'Skills', 'Regulation', 'Taxation and levies', 'Destination', 'Other']),
    summary: z.string(),
    document: opt(z.string()),
    draft: z.boolean().default(false),
  }),
});

const programmes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programmes' }),
  schema: z.object({
    name: z.string(),
    pillar: z.enum(PILLARS),
    family: z.enum(['Membership', 'Intelligence', 'HAZ Digital', 'Convening', 'Partnerships', 'Programmes']),
    status: z.enum(['live', 'launching', 'development']),
    summary: z.string(),
    order: z.number().default(100),
    ctaLabel: opt(z.string()),
    ctaUrl: opt(z.string()),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/members' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      area: opt(z.string()),
      region: z.enum(REGIONS),
      website: optionalUrl,
      rooms: opt(z.number().int().positive()),
      description: opt(z.string()),
      logo: opt(image()),
      membershipYear: opt(z.string()),
      hidden: z.boolean().default(false),
    }),
});

const affiliates = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/affiliates' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      level: opt(z.enum(AFFILIATE_LEVELS)),
      businessType: z.enum(BUSINESS_TYPES),
      website: optionalUrl,
      description: opt(z.string()),
      offer: opt(z.string()),
      logo: opt(image()),
      hidden: z.boolean().default(false),
    }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/people' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      organisation: opt(z.string()),
      group: z.enum(['Leadership', 'Chapter chairs', 'Board']),
      order: z.number().default(100),
      bio: opt(z.string()),
      email: opt(z.string()),
      photo: opt(image()),
      photoAlt: opt(z.string()),
    }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/sponsors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      website: optionalUrl,
      logo: image(),
      supports: opt(z.string()),
      order: z.number().default(100),
    }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      label: z.string(),
      image: image(),
      alt: z.string(),
      credit: opt(z.string()),
      interim: z.boolean().default(false),
    }),
});

export const collections = { news, events, pulse, positions, programmes, members, affiliates, people, sponsors, photos };

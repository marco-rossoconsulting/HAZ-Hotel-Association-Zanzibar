import site from '@/data/site.json';
import { getCollection, type CollectionEntry } from 'astro:content';

export { site };

export type NavItem = { label: string; href: string; description?: string; children?: NavItem[] };

/** Primary navigation. Brand: a clear route for each audience. */
export const nav: NavItem[] = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Who we are', href: '/about/', description: 'Purpose, pillars and how HAZ works' },
      { label: 'Leadership', href: '/about/leadership/', description: 'The Board and chapter chairs' },
      { label: 'Programmes', href: '/programmes/', description: 'Everything HAZ runs, and what is next' },
      { label: 'Sponsors', href: '/sponsors/', description: 'Back the industry that backs Zanzibar' },
      { label: 'Contact', href: '/contact/', description: 'Reach the Secretariat' },
    ],
  },
  {
    label: 'Members',
    href: '/members/',
    children: [
      { label: 'Member hotels', href: '/members/', description: 'Directory and map of member hotels' },
      { label: 'Why join', href: '/join/', description: 'Benefits, fees and how to apply' },
      { label: 'Member badge', href: '/members/badge/', description: 'Show your hotel is part of HAZ' },
      { label: 'Market Pulse', href: '/market-pulse/', description: 'Weekly market intelligence' },
    ],
  },
  { label: 'Affiliates', href: '/affiliates/' },
  { label: 'Policy', href: '/policy/' },
  { label: 'Invest', href: '/invest/' },
  { label: 'Careers', href: '/careers/' },
  {
    label: 'Media',
    href: '/media/',
    children: [
      { label: 'News', href: '/news/', description: 'Updates from HAZ' },
      { label: 'Events', href: '/events/', description: 'Forums, summits and partner events' },
      { label: 'Media kit', href: '/media/', description: 'Descriptions, logos, spokespeople' },
    ],
  },
];

export const footerNav: NavItem[] = [
  {
    label: 'Membership',
    href: '/join/',
    children: [
      { label: 'Why join', href: '/join/' },
      { label: 'Hotel application', href: '/join/hotel/' },
      { label: 'Affiliate application', href: '/join/affiliate/' },
      { label: 'Member hotels', href: '/members/' },
      { label: 'Member badge', href: '/members/badge/' },
    ],
  },
  {
    label: 'What we do',
    href: '/programmes/',
    children: [
      { label: 'Programmes', href: '/programmes/' },
      { label: 'Market Pulse', href: '/market-pulse/' },
      { label: 'Policy and positions', href: '/policy/' },
      { label: 'Invest Zanzibar', href: '/invest/' },
      { label: 'Careers & Training', href: '/careers/' },
    ],
  },
  {
    label: 'HAZ',
    href: '/about/',
    children: [
      { label: 'Who we are', href: '/about/' },
      { label: 'Leadership', href: '/about/leadership/' },
      { label: 'News', href: '/news/' },
      { label: 'Events', href: '/events/' },
      { label: 'Media kit', href: '/media/' },
      { label: 'Sponsors', href: '/sponsors/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

/** British date format: 1 October 2026 */
export const formatDate = (d: Date, opts: Intl.DateTimeFormatOptions = {}) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Dar_es_Salaam', ...opts }).format(d);

export const formatShortDate = (d: Date) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'Africa/Dar_es_Salaam' }).format(d);

/** Brand number style: USD 1,000 */
export const usd = (n: number) => `USD ${n.toLocaleString('en-GB')}`;

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Published (non-draft) entries, newest first. */
export async function getNews() {
  const all = await getCollection('news', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export async function getPulse() {
  const all = await getCollection('pulse', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
export async function getPositions() {
  const all = await getCollection('positions', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
/** Events split into upcoming (soonest first) and past (latest first), relative to build time. */
export async function getEvents() {
  const all = await getCollection('events', ({ data }) => !data.draft);
  const now = Date.now();
  const isPast = (e: CollectionEntry<'events'>) => (e.data.end ?? e.data.start).valueOf() < now - 24 * 3600 * 1000;
  const upcoming = all.filter((e) => !isPast(e)).sort((a, b) => a.data.start.valueOf() - b.data.start.valueOf());
  const past = all.filter(isPast).sort((a, b) => b.data.start.valueOf() - a.data.start.valueOf());
  return { upcoming, past };
}
export async function getPhoto(id: string) {
  const all = await getCollection('photos');
  const p = all.find((x) => x.id === id);
  if (!p) throw new Error(`Photo slot "${id}" missing in src/content/photos`);
  return p.data;
}

export const statusLabel: Record<'live' | 'launching' | 'development', string> = {
  live: 'Live',
  launching: 'Launching soon',
  development: 'In development',
};

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, getNews, affiliateLevelName, usd } from '@/lib/site';
import fees from '@/data/fees.json';

/** llms.txt: a plain-text summary for AI assistants and answer engines (brand: accurate AI answers to "What is HAZ?"). */
export const GET: APIRoute = async ({ site: base }) => {
  const url = (p: string) => new URL(p, base).toString();
  const programmes = (await getCollection('programmes')).sort((a, b) => a.data.order - b.data.order);
  const members = (await getCollection('members', ({ data }) => !data.hidden)).sort((a, b) => a.data.name.localeCompare(b.data.name));
  const news = (await getNews()).slice(0, 10);
  const affiliateLevels = fees.affiliate
    .map((l) => {
      const note = 'note' in l && l.note ? ` (${l.note.charAt(0).toLowerCase()}${l.note.slice(1)})` : '';
      return `${affiliateLevelName(l.level)} ${l.fee ? usd(l.fee) : 'fee on application'}${note}`;
    })
    .join('; ');
  const status = { live: 'live', launching: 'launching soon', development: 'in development' } as const;

  const body = `# ${site.name} (HAZ)

> ${site.oneLine}

${site.description50}

Corporate line: ${site.corporateLine}
Founded: June 2021, Zanzibar, Tanzania
Contact: ${site.email}
Address: ${site.address.street}, ${site.address.poBox}, ${site.address.locality}, ${site.address.country}

## Key pages
- [About HAZ](${url('/about/')}): purpose, vision, mission, pillars and values
- [Join HAZ](${url('/join/')}): member benefits, annual fees and how to apply
- [Member hotels](${url('/members/')}): directory of member hotels by region
- [Affiliate Members](${url('/affiliates/')}): membership for suppliers and service providers
- [HAZ Green Certification](${url('/green/')}): the HAZ sustainability certification for member hotels
- [Policy and positions](${url('/policy/')}): advocacy on water, waste, power and skills
- [Programmes](${url('/programmes/')}): every HAZ programme and its status
- [Market Pulse](${url('/market-pulse/')}): weekly market intelligence for hotels
- [Media kit](${url('/media/')}): approved descriptions, logos and spokespeople
- [Contact](${url('/contact/')})

## Facts
- HAZ membership is accepted by the Zanzibar Commission for Tourism (ZCT) as evidence of association membership for hotel licensing.
- Hotel membership fees are set per membership year by number of rooms and rate band.
- Membership types: Hotel Member, Affiliate Member, Corporate Sponsor.
- Affiliate levels (${fees.year}, a year): ${affiliateLevels}. Each level includes the benefits of the levels before it.
- HAZ Green Certification: the HAZ sustainability certification, mandatory for and included in hotel membership. Four levels, each earned with evidence: Level 1 · Shoots (entry score 25/100), Level 2 · Roots (50), Level 3 · Fruits (70), Level 4 · Legends (90). An independent Certification Decision Panel decides every award; certificates are valid for 12 months. Technical partner: Blue Impact Network, from November 2026. Aligned with the goals of the GSTC Hotel Standard (not a GSTC certification) and following ZCT regulations.
- Pillars: People, Place, Prosperity, Together.

## Programmes
${programmes.map((p) => `- ${p.data.name} (${p.data.pillar}, ${status[p.data.status]}): ${p.data.summary}`).join('\n')}

## Member hotels
${members.map((m) => `- ${m.data.name}${m.data.area ? `, ${m.data.area}` : ''}`).join('\n')}

## Latest news
${news.map((n) => `- [${n.data.title}](${url(`/news/${n.id}/`)})`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

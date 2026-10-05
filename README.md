# Hotel Association Zanzibar (HAZ) website

The website of Hotel Association Zanzibar (HAZ), **haz.or.tz**. Built to the *HAZ Brand Guidelines & Standards 2026*.

**Stack:** [Astro 7](https://astro.build) (static) · [Sveltia CMS](https://sveltiacms.app) for editing · hosted on [Netlify](https://www.netlify.com) with Netlify Forms.

---

## 1. Run it locally

You need Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run check      # type and template checks
```

## 2. Deploy on Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub →** `marco-rossoconsulting/HAZ-Hotel-Association-Zanzibar`.
2. Build settings are read from `netlify.toml` (build `npm run build`, publish `dist`, Node 22). Nothing to change.
3. **Domain:** add `www.haz.or.tz` as the primary domain and `haz.or.tz` as an alias (Netlify redirects the apex to www). The site's canonical URLs and the member badge both use `https://www.haz.or.tz`.
4. Old WordPress URLs (`/haz-profile/`, `/haz-members-list/`, `/sponsor/` …) are redirected in `netlify.toml`.

### Forms (membership applications, enquiries, sign-ups)

All forms are native Netlify Forms. They work as soon as the site is deployed.

1. **Site configuration → Forms → Enable form detection**, then redeploy once.
2. **Forms → Form notifications → Add notification → Email notification**:

| Form name | Send to | Purpose |
|---|---|---|
| `hotel-application` | chairman@haz.or.tz | Hotel membership application |
| `affiliate-application` | chairman@haz.or.tz | Affiliate application (with file uploads) |
| `contact` | info@haz.or.tz | Contact page |
| `invest-enquiry` | info@haz.or.tz | Invest Zanzibar enquiries |
| `sponsor-enquiry` | info@haz.or.tz | Sponsorship enquiries |
| `market-pulse` | info@haz.or.tz | Market Pulse sign-ups |
| `notify` | info@haz.or.tz | "Notify me" sign-ups for programmes that are not live yet |

Spam protection: every form has a honeypot field. Netlify's spam filter is on by default.

## 3. The editor (Sveltia CMS)

Editors work at **https://www.haz.or.tz/admin/**. Every save is a commit to GitHub, and Netlify rebuilds the site in about a minute.

**One-time sign-in setup (GitHub OAuth through Netlify):**

1. GitHub → Settings → Developer settings → **OAuth Apps → New OAuth App**
   - Homepage URL: `https://www.haz.or.tz`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Copy the Client ID and generate a Client secret.
3. Netlify → **Site configuration → Access & security → OAuth → Install provider → GitHub**, and paste both values.
4. Each editor needs a GitHub account with write access to the repository.

Editors can also sign in with a GitHub personal access token from the login screen.

### What editors can change

| In the editor | Where it shows |
|---|---|
| **News** | /news/, homepage "Latest from HAZ" |
| **Events** | /events/, homepage, "Zanzibar today" strip |
| **Market Pulse** | /market-pulse/; the newest issue is linked from the homepage hero |
| **HAZ Positions** | /policy/ |
| **Programmes** | /programmes/, pillar panels. Set **Status** to *Live* when a programme launches |
| **Member hotels** | /members/ directory, map and member pages (`/members/<name>/`, the page the member badge links to) |
| **Affiliate Members** | /affiliates/ |
| **Leadership** | /about/leadership/ (photos optional) |
| **Corporate Sponsors** | /sponsors/ (the partner band appears once a sponsor is added) |
| **Site photography** | Fixed photo slots used across the site |
| **Settings → Membership figures** | Member hotels, rooms, employees. Hidden until a value is entered |
| **Settings → Membership fees** | Hotel fee table and calculator, Affiliate levels and fees |
| **Settings → Site and contacts** | Contacts, address, social links, homepage hero text |

The corporate line, narrative line and logo are locked: they need Board approval to change (brand section 15).

## 4. Content rules for editors (from the brand guidelines)

- British English; sentence-case headings; "Hotel Association Zanzibar (HAZ)" on first mention, then "HAZ" (never "the HAZ" for the organisation, never "Hotel Association of Zanzibar").
- Lead with the outcome. A number, a name or a date beats an adjective. Every figure has a date, unit and source.
- Say "Zanzibaris", "residents", "communities", never "locals". Avoid "paradise", "exotic", "world-class".
- Membership terms: Hotel Member, Affiliate Member (Standard, Preferred, Corporate, Strategic, Principal Affiliate), Corporate Sponsor. Never "Corporate Partner".
- Photography: real Zanzibar, real people, real work. Written consent from every identifiable person. At least 1,600 px on the long edge.
- Never promise savings across the board. When a negotiated term exists, name the partner, the term and who qualifies.

## 5. Open items before launch

1. **Photography.** All seven photo slots use interim Unsplash photographs (credited on /media/). Replace them with commissioned HAZ photography in *Site photography*.
2. **Affiliate fees.** Not set; the site shows "Fee on application". Add them in *Settings → Membership fees*.
3. **Membership figures.** Add member hotels, rooms and employees from the membership database in *Settings → Membership figures*.
4. **Member hotels and Board.** Seeded from the old website (2024). Review in the editor. Kinasi Lodge (Mafia Island) is listed under "Beyond Zanzibar". I Grandi Viaggi and Veratour are listed as Affiliate Members (tour operators).
5. **Social channels.** Only Facebook and Instagram are known. Add LinkedIn, YouTube and the WhatsApp Channel in *Settings → Site and contacts*.
6. **Documents.** The HAZ Constitution and Annual Report 2022 on the old site are not migrated. Upload them if they should stay public.
7. **Events, Market Pulse, Positions, Sponsors** start empty, with designed empty states.

## 6. Project structure

```
public/
  admin/            Sveltia CMS (index.html, config.yml)
  brand/            Logo and member badge downloads
  uploads/          Files uploaded through the editor (PDFs)
src/
  assets/brand/     Logo, compact mark and badges (optimised by Astro)
  assets/photos/    Site photography (photo slots)
  assets/uploads/   Images uploaded through the editor
  components/       Header, Footer, MemberMap, FeeCalculator, forms …
  components/home/  Homepage sections
  content/          Markdown and YAML content (edited in the CMS)
  content.config.ts Content schemas (keep in sync with public/admin/config.yml)
  data/             Site settings, fees, figures (JSON, edited in the CMS)
  layouts/          BaseLayout (SEO, schema.org, fonts)
  pages/            Routes
  scripts/          Motion and form enhancement
  styles/           Design tokens and global styles
scripts/gen-map.mjs Regenerates the Unguja and Pemba outlines (Natural Earth)
```

## 7. Design system

Tokens live in `src/styles/global.css`, taken from brand sections 10 to 13:

- **Colour:** Warm Ivory and white grounds, Anthracite text and panels, Indian Ocean premium panels, HAZ Gold for accents only. Gold Deep `#866010` for links and buttons; Taupe Deep for captions. Lagoon, Clove and Mangrove are reserved for data and maps.
- **Type:** Cormorant Garamond 500/600 for display (never below 28 px), Inter for everything else. Self-hosted.
- **Graphic language:** 1 px gold or grey hairlines, small gold labels, one arch-framed image per page (the Mlango arch, images only), 12-column grid with a 1,200 px content width.
- **Logo versions:** white on Anthracite (header), gold on Indian Ocean (footer). Minimum 160 px wide on screen.
- **Motion:** motivated and quiet (door-opening hero reveal, rules that draw in, figures that count up), all disabled under `prefers-reduced-motion`.
- **Accessibility:** WCAG 2.2 AA (checked with axe-core), 16 px minimum text, visible focus states, keyboard-operable menus, map and calculators.

## 8. Adding Kiswahili later

The site is set up for internationalisation (`i18n` in `astro.config.mjs`). To add Kiswahili: add `'sw'` to `locales`, mirror the pages under `src/pages/sw/`, and enable `i18n` in `public/admin/config.yml` so editors can translate each entry side by side. Kiswahili copy should be written or reviewed by a native speaker.

## 9. Discoverability

- `schema.org` Organization (with the brand's 50-word description), WebSite, FAQPage, NewsArticle, Event, Hotel and ItemList data.
- `/sitemap-index.xml`, `/robots.txt`, and `/llms.txt` (a plain-text summary for AI assistants, built from live content).
- Default share image: `public/og-default.jpg`.

---

Better business. Better Zanzibar.

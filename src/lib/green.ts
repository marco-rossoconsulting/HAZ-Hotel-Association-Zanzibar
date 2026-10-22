/**
 * HAZ Green Certification: the four levels (brand guidelines v4.1, section 15; Hotel Introduction, October 2026).
 * The level names, descriptors and entry scores are fixed by the scheme: change them only with the standard.
 * Badges are reproduced from the master artwork in the brand guidelines. Dark badges go on light
 * backgrounds, light badges on dark ones, and they are never edited, cropped or recoloured.
 */
import type { ImageMetadata } from 'astro';
import dark1 from '@/assets/brand/haz-green-level-1-dark.png';
import dark2 from '@/assets/brand/haz-green-level-2-dark.png';
import dark3 from '@/assets/brand/haz-green-level-3-dark.png';
import dark4 from '@/assets/brand/haz-green-level-4-dark.png';
import light1 from '@/assets/brand/haz-green-level-1-light.png';
import light2 from '@/assets/brand/haz-green-level-2-light.png';
import light3 from '@/assets/brand/haz-green-level-3-light.png';
import light4 from '@/assets/brand/haz-green-level-4-light.png';

export interface GreenLevel {
  n: 1 | 2 | 3 | 4;
  name: 'Shoots' | 'Roots' | 'Fruits' | 'Legends';
  focus: string;
  /** Entry score out of 100 */
  entry: number;
  /** The mangrove at this stage of its life (brand section 15, "Why a mangrove") */
  stage: string;
  badge: { dark: ImageMetadata; light: ImageMetadata };
  /** Award year printed on the reproduced badge artwork */
  year: string;
}

export const GREEN_YEAR = '2026/27';

export const greenLevels: GreenLevel[] = [
  { n: 1, name: 'Shoots', focus: 'Foundations and commitment', entry: 25, stage: 'A propagule taking root', badge: { dark: dark1, light: light1 }, year: GREEN_YEAR },
  { n: 2, name: 'Roots', focus: 'Operational implementation', entry: 50, stage: 'A sapling', badge: { dark: dark2, light: light2 }, year: GREEN_YEAR },
  { n: 3, name: 'Fruits', focus: 'Measurable environmental and social impact', entry: 70, stage: 'A young tree bearing fruit', badge: { dark: dark3, light: light3 }, year: GREEN_YEAR },
  { n: 4, name: 'Legends', focus: 'Conservation leadership and lasting legacy', entry: 90, stage: 'A mature tree on its stilt roots', badge: { dark: dark4, light: light4 }, year: GREEN_YEAR },
];

/** Brand naming: the number leads. "Level 2 · Roots" */
export const levelTitle = (l: GreenLevel) => `Level ${l.n} · ${l.name}`;

/** Brand alt text: "HAZ Green Certification, Level 2 · Roots, 2026/27" */
export const badgeAlt = (l: GreenLevel) => `HAZ Green Certification, ${levelTitle(l)}, ${l.year}`;

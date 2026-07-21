export const ASSETS = {
  hero: '/images/assets/immuderm-masterclass-2026-full-color.webp',
  pattern: '/images/assets/pattern_immunoderm.webp',
  logoCombined: '/images/assets/pds-immunoderm-logo.webp',
  logoPds: '/images/assets/pds-logo.webp',
  registerRegular: '/images/assets/registerpost-regular-01.webp',
} as const

export function speakerImage(slug: string) {
  return `/images/speakers/${slug}.jpg`
}

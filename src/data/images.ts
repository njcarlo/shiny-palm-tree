export const ASSETS = {
  hero: '/images/assets/immuderm-masterclass-2026-full-color.png',
  heroBlack: '/images/assets/immuderm-masterclass-2026-black.png',
  heroWhite: '/images/assets/immuderm-masterclass-2026-white.png',
  pattern: '/images/assets/pattern_immunoderm.png',
  logoCombined: '/images/assets/pds-immunoderm-logo.png',
  logoPds: '/images/assets/pds-logo.png',
  registerFree: '/images/assets/registerpost-free-01.png',
  registerRegular: '/images/assets/registerpost-regular-01.png',
  colorHexcodes: '/images/assets/immunoderm-color-hexcodes.png',
} as const

export function speakerImage(slug: string) {
  return `/images/speakers/${slug}.jpg`
}

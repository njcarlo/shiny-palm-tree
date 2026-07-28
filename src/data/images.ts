import logoHeader from '../assets/brand/immunoderm-header-logo.webp'
import logoPds from '../assets/brand/pds-logo.webp'
import logoCombined from '../assets/brand/pds-immunoderm-logo.webp'
import registerQr from '../assets/brand/register-qr.webp'
import hero from '../assets/brand/immuderm-masterclass-2026-full-color.webp'
import pattern from '../assets/brand/pattern_immunoderm.webp'
import coreGroupDoc from '../assets/docs/immunodermatology-subspecialty-core-group.jpg'
import directoryDoc from '../assets/docs/immunodermatology-2026-directory.jpg'
import programDownload from '../assets/docs/immunodermatology-masterclass-2026-program.jpg'

const speakerModules = import.meta.glob('../assets/speakers/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const speakerBySlug = Object.fromEntries(
  Object.entries(speakerModules).map(([path, url]) => {
    const file = path.split('/').pop() ?? ''
    const slug = file.replace(/\.jpg$/i, '')
    return [slug, url]
  }),
) as Record<string, string>

export const ASSETS = {
  hero,
  pattern,
  logoCombined,
  logoPds,
  logoHeader,
  registerQr,
  /** @deprecated kept for type compatibility; unused in UI */
  registerRegular: registerQr,
} as const

export const TEAM_DOC_ASSETS = {
  coreGroup: coreGroupDoc,
  directory: directoryDoc,
} as const

export const PROGRAM_DOWNLOAD_HREF = programDownload

export function speakerImage(slug: string) {
  return speakerBySlug[slug] ?? ''
}

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve('public/images')

/** @type {Array<{ input: string; maxWidth: number; webpQuality?: number; pngCompression?: number }>} */
const targets = [
  {
    input: 'assets/pattern_immunoderm.png',
    maxWidth: 480,
    webpQuality: 55,
    pngCompression: 9,
  },
  {
    input: 'assets/pds-logo.png',
    maxWidth: 256,
    webpQuality: 82,
    pngCompression: 9,
  },
  {
    input: 'assets/pds-immunoderm-logo.png',
    maxWidth: 560,
    webpQuality: 82,
    pngCompression: 9,
  },
  {
    input: 'assets/immuderm-masterclass-2026-full-color.png',
    maxWidth: 1520,
    webpQuality: 82,
    pngCompression: 9,
  },
  {
    input: 'assets/registerpost-free-01.png',
    maxWidth: 800,
    webpQuality: 80,
    pngCompression: 9,
  },
  {
    input: 'assets/registerpost-regular-01.png',
    maxWidth: 800,
    webpQuality: 80,
    pngCompression: 9,
  },
]

async function optimizeOne({ input, maxWidth, webpQuality = 80, pngCompression = 9 }) {
  const source = path.join(root, input)
  const parsed = path.parse(source)
  const webpOut = path.join(parsed.dir, `${parsed.name}.webp`)
  const pngOut = source

  const image = sharp(source)
  const meta = await image.metadata()
  const resizeNeeded = (meta.width ?? 0) > maxWidth

  let pipeline = sharp(source)
  if (resizeNeeded) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }

  const before = (await fs.stat(source)).size

  await pipeline
    .clone()
    .webp({ quality: webpQuality, effort: 6 })
    .toFile(webpOut)

  await pipeline
    .clone()
    .png({ compressionLevel: pngCompression, palette: meta.hasAlpha })
    .toFile(`${pngOut}.tmp`)

  await fs.rename(`${pngOut}.tmp`, pngOut)

  const afterPng = (await fs.stat(pngOut)).size
  const afterWebp = (await fs.stat(webpOut)).size

  return {
    input,
    before,
    afterPng,
    afterWebp,
    resized: resizeNeeded,
  }
}

const results = []
for (const target of targets) {
  results.push(await optimizeOne(target))
}

console.log('Optimized images:')
for (const row of results) {
  const savedPng = ((1 - row.afterPng / row.before) * 100).toFixed(1)
  const savedWebp = ((1 - row.afterWebp / row.before) * 100).toFixed(1)
  console.log(
    `${row.input}: ${(row.before / 1024).toFixed(0)}KB -> PNG ${(row.afterPng / 1024).toFixed(0)}KB (${savedPng}%), WebP ${(row.afterWebp / 1024).toFixed(0)}KB (${savedWebp}%)${row.resized ? ' [resized]' : ''}`,
  )
}

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { encode } from 'blurhash'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const root = path.resolve(__dirname, '..')
const publicationsPath = path.join(root, 'src', 'assets', 'publications.json')
const publicDir = path.join(root, 'public')
const topicDir = path.join(publicDir, 'topic-teasers')
const topicBlurhashOut = path.join(root, 'src', 'assets', 'topic-blurhashes.json')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

function writeJson(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

async function computeBlurhashForImage(imgPath) {
  // Resize to small dims for blurhash; ensure RGBA raw buffer
  const resized = await sharp(imgPath)
    .ensureAlpha()
    .resize(32, 24, { fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { data, info } = resized
  const pixels = new Uint8ClampedArray(data)
  const hash = encode(pixels, info.width, info.height, 4, 3)
  return hash
}

async function main() {
  const publications = readJson(publicationsPath)
  let updated = 0
  for (const paper of publications) {
    if (paper.blurhash) continue
    const teaserUrl = paper.teaserUrl
    if (!teaserUrl || typeof teaserUrl !== 'string') continue
    const rel = teaserUrl.startsWith('/') ? teaserUrl.slice(1) : teaserUrl
    const imgPath = path.join(publicDir, rel)
    if (!fs.existsSync(imgPath)) {
      console.warn('[skip] Image not found:', imgPath)
      continue
    }
    try {
      const hash = await computeBlurhashForImage(imgPath)
      paper.blurhash = hash
      updated++
      console.log('[ok] Generated blurhash for', rel)
    } catch (e) {
      console.error('[error] Failed to generate blurhash for', rel, e)
    }
  }
  if (updated > 0) {
    writeJson(publicationsPath, publications)
    console.log(`Updated ${updated} entries with blurhash.`)
  } else {
    console.log('No entries updated.')
  }

  // --- Generate blurhash mapping for topics (public/topic-teasers/*) ---
  if (fs.existsSync(topicDir)) {
    const files = fs.readdirSync(topicDir).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    const mapping = {}
    for (const f of files) {
      const imgPath = path.join(topicDir, f)
      try {
        const hash = await computeBlurhashForImage(imgPath)
        // Use path starting with "/topic-teasers/" as the key for easy lookup
        mapping[`/topic-teasers/${f}`] = hash
        console.log('[ok] Topic blurhash for', f)
      } catch (e) {
        console.error('[error] Failed topic blurhash for', f, e)
      }
    }
    writeJson(topicBlurhashOut, mapping)
    console.log('Wrote topic blurhash mapping to', path.relative(root, topicBlurhashOut))
  } else {
    console.warn('Topic directory not found:', topicDir)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

/**
 * Builds the two navbar logo variants from the studio's white wordmark.
 *
 * The source (public/resource/profile and logos/white version copy.png) is a
 * cream wordmark on transparency, sitting inside a large square of empty
 * padding. The navbar needs it trimmed tight, and it needs a dark version:
 * the cream one is invisible once the bar scrolls onto the light background.
 *
 * The ink variant is made by keeping the source's alpha channel as a mask and
 * filling it with the theme's ink colour, so letterform edges and anti-aliasing
 * survive exactly as drawn.
 *
 * Run from frontend/:  node scripts/build-logos.mjs
 */
import sharp from "sharp";

const SRC = "public/resource/profile and logos/white version  copy.png";
const OUT = "public/media/brand";

const INK = { r: 27, g: 36, b: 24 }; // --color-ink #1b2418
const WIDTH = 720;

// Trim the transparent margin, then normalise to a predictable width.
const trimmed = await sharp(SRC)
  .ensureAlpha()
  .trim()
  .resize({ width: WIDTH, withoutEnlargement: true })
  .png()
  .toBuffer();

const { width, height } = await sharp(trimmed).metadata();

await sharp(trimmed).toFile(`${OUT}/wordmark-cream.png`);
console.log(`wordmark-cream.png  ${width}x${height}`);

// Same shape, ink-filled: solid colour wearing the original's alpha as a mask.
const alpha = await sharp(trimmed).extractChannel("alpha").toBuffer();

await sharp({
  create: { width, height, channels: 3, background: INK },
})
  .joinChannel(alpha)
  .png()
  .toFile(`${OUT}/wordmark-ink.png`);
console.log(`wordmark-ink.png    ${width}x${height}`);

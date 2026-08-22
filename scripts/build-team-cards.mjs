/**
 * Web-optimises the studio's "Introducing" bio cards for the Team section.
 *
 * These are shown whole — the card carries the person's name, role and bio as
 * part of the artwork, so unlike ordinary photography it must stay sharp
 * enough to *read*. That's why this exports wider and at a higher quality than
 * the gallery pass in optimize-images.sh: soft body copy would be a defect
 * here, not just a slightly soft picture.
 *
 * Run from frontend/:  node scripts/build-team-cards.mjs
 */
import sharp from "sharp";

const SRC = "public/resource/profile and logos";
const OUT = "public/media/team";

const WIDTH = 1400; // ~2x the largest rendered width, for crisp text on HiDPI
const QUALITY = 88;

for (const [src, out] of [
  ["Shub.jpg", "card-shubham.jpg"],
  ["Shiv.jpg", "card-shivam.jpg"],
]) {
  await sharp(`${SRC}/${src}`)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(`${OUT}/${out}`);

  const { width, height, size } = await sharp(`${OUT}/${out}`).metadata();
  console.log(`${out}  ${width}x${height}  ${(size / 1024).toFixed(0)}KB`);
}

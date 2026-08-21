/**
 * Pulls the B&W headshots out of the studio's "Introducing" bio cards.
 *
 * The source cards (public/media/team/shubh.jpg, shiv.jpg) are 800x1000 green
 * brand graphics with a framed portrait inset. The site lays the team out in
 * its own grid, so it needs just the photo — this extracts it, insetting past
 * the card's white keyline.
 *
 * Run from the frontend/ directory:  node scripts/crop-team.mjs
 */
import sharp from "sharp";

const dir = "public/media/team";
const box = { left: 406, top: 91, width: 306, height: 394 };

const pairs = [
  ["shubh.jpg", "shubham.jpg"],
  ["shiv.jpg", "shivam.jpg"],
];

for (const [src, out] of pairs) {
  await sharp(`${dir}/${src}`)
    .extract(box)
    .resize(800)
    .jpeg({ quality: 88 })
    .toFile(`${dir}/${out}`);
  console.log("cropped", out);
}

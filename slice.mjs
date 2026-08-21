import sharp from "sharp";
const src = "full.png";
const { height } = await sharp(src).metadata();
const n = 4, h = Math.ceil(height / n);
for (let i = 0; i < n; i++) {
  const top = i * h, hh = Math.min(h, height - top);
  await sharp(src).extract({ left: 0, top, width: 1440, height: hh })
    .resize(1000).png().toFile(`slice-${i}.png`);
  console.log(`slice-${i}.png  rows ${top}-${top + hh}`);
}

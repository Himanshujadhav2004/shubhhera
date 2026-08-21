#!/bin/bash
# Optimize raw camera exports (~15MB each) into web-ready assets under public/media/.
# Uses macOS built-in `sips` (no Homebrew/ffmpeg available on this machine).
set -u

SRC="/Users/shubhh.era/Desktop/protfolio/frontend/public/resource"
OUT="/Users/shubhh.era/Desktop/protfolio/frontend/public/media"

MAXW=1800   # long-edge cap for full-size gallery/lightbox images
QUALITY=65  # sips jpeg quality bucket

# process <src-dir> <out-name> <count>
process() {
  local dir="$1" name="$2" limit="$3"
  mkdir -p "$OUT/$name"
  local i=0
  # shellcheck disable=SC2045
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    i=$((i + 1))
    [ "$i" -gt "$limit" ] && break
    local target
    target=$(printf "%s/%s/%s-%02d.jpg" "$OUT" "$name" "$name" "$i")
    sips -s format jpeg \
         -s formatOptions "$QUALITY" \
         -Z "$MAXW" \
         "$f" --out "$target" >/dev/null 2>&1 \
      && echo "ok   $name-$i  <- $(basename "$f")" \
      || echo "FAIL $name-$i  <- $(basename "$f")"
  done < <(find "$dir" -maxdepth 1 -type f \
             \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) \
             ! -name '._*' | sort)
}

echo "=== optimizing into $OUT ==="
# NB: these source dirs carry trailing spaces in their names — keep them verbatim.
process "$SRC/ PHOTOSSS/wedding "            "wedding"     18
process "$SRC/ PHOTOSSS/pre wedding "        "pre-wedding" 18
process "$SRC/ PHOTOSSS/collages for front " "featured"    12
process "$SRC/ photos model shoot "          "model"        6
process "$SRC/ photots"                      "portrait"    16

# Brand marks + team headshots keep their meaning, so name them explicitly.
mkdir -p "$OUT/brand"
sips -s format png -Z 1200 "$SRC/profile and logos/white version  copy.png" \
     --out "$OUT/brand/logo-cream.png" >/dev/null 2>&1 && echo "ok   logo-cream"
sips -s format png -Z 1200 "$SRC/profile and logos/Black and White Modern Y2K Streetwear Brand Logo copy 2.png" \
     --out "$OUT/brand/logo-green.png" >/dev/null 2>&1 && echo "ok   logo-green"

mkdir -p "$OUT/team"
for pair in "Shub.jpg:shubh" "Shiv.jpg:shiv" "71DF2B44-4803-44F2-A750-A529455BD749.JPG:team-3"; do
  src="${pair%%:*}"; dst="${pair##*:}"
  sips -s format jpeg -s formatOptions "$QUALITY" -Z 1000 \
       "$SRC/profile and logos/$src" --out "$OUT/team/$dst.jpg" >/dev/null 2>&1 \
    && echo "ok   team/$dst"
done

echo "=== done ==="
du -sh "$OUT"
find "$OUT" -type f -name '*.jpg' -o -name '*.png' | wc -l

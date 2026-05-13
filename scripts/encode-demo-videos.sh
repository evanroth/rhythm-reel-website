#!/bin/bash
# Re-encode every demo-N.mp4 in public/videos/ as all-intra H.264.
# Every frame becomes a keyframe so scrubbing is instant (no inter-frame decode).
set -e

DIR="$(cd "$(dirname "$0")/.." && pwd)/public/videos"

for f in "$DIR"/demo-*.mp4; do
  echo "Encoding $(basename "$f")..."
  tmp="${f%.mp4}.tmp.mp4"
  ffmpeg -y -loglevel error -i "$f" \
    -c:v libx264 -preset slow -crf 23 \
    -g 1 -keyint_min 1 -bf 0 -sc_threshold 0 \
    -pix_fmt yuv420p \
    -an \
    -movflags +faststart \
    "$tmp"
  mv "$tmp" "$f"
done

echo
echo "Done. Sizes:"
ls -lh "$DIR"/demo-*.mp4 | awk '{print $5, $9}'

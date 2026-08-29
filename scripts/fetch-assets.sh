#!/usr/bin/env bash
#
# Pulls the generated Blüten Sturm character assets into public/assets/.
#
# Run this once on a machine with normal internet access:
#     bash scripts/fetch-assets.sh
#
# The site works without them (it falls back to the procedural scene), but
# these are the real thing. If you regenerate an asset in Higgsfield, replace
# the matching URL below and re-run.
set -euo pipefail

CDN="https://d8j0ntlcm91z4.cloudfront.net/user_3IadFYU277WUN3gYJKbtKPWHSIa"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/assets"
mkdir -p "$DEST"

fetch() {
  local url="$1" out="$2"
  echo "→ $out"
  if ! curl -fSL --retry 3 --retry-delay 2 -o "$DEST/$out" "$url"; then
    echo "   FAILED — asset link may have expired; re-export from Higgsfield." >&2
  fi
}

# A1 — character hero still (also used as the reduced-motion hero poster)
fetch "$CDN/hf_20260829_141917_6863f280-691e-4b50-a1eb-6e5c6dbb0b87.png" "hero-poster.png"

# A2 — character mesh, textured PBR GLB
fetch "$CDN/hf_20260829_142126_d06306c5-16b9-4426-9511-3d7a771332c8.glb" "character.glb"

# A3 — idle loop
fetch "$CDN/hf_20260829_142148_14b79181-2e75-4678-9421-58b48d582a28.mp4" "idle-loop.mp4"

# A4 — chapter-transition panel burst
fetch "$CDN/hf_20260829_142140_061926d1-1998-411a-b1f3-a6784ab28f3a.mp4" "panel-burst.mp4"

# A5 — closing logo convergence
fetch "$CDN/hf_20260829_142140_b422c64e-a0c9-4fe9-9af7-3b2c2181189c.mp4" "logo-converge.mp4"

echo
echo "Done. Files in public/assets:"
ls -la "$DEST"

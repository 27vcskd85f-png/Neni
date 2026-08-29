#!/usr/bin/env bash
#
# Builds the site and packs it for a Netlify drag-and-drop deploy.
#
#     bash scripts/pack-netlify.sh
#     → bluetensturm-netlify.zip
#
# Drop the zip on https://app.netlify.com/drop. index.html sits at the zip
# root, which is what Netlify Drop expects.
#
# For a Git-connected deploy you do not need this — netlify.toml at the repo
# root already declares the build command and publish directory.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OUT="bluetensturm-netlify.zip"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

echo "→ building"
npm run build

echo "→ staging"
cp -R dist/. "$STAGE/"

# Internal documentation should not be served from the public site.
rm -f "$STAGE/assets/README.md"

# Netlify Drop ignores build settings, so caching and security headers
# travel with the upload as a _headers file.
cat > "$STAGE/_headers" <<'HEADERS'
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: geolocation=(), microphone=(), camera=()
HEADERS

rm -f "$ROOT/$OUT"
( cd "$STAGE" && zip -qr "$ROOT/$OUT" . )

echo
echo "Packed $OUT"
unzip -l "$ROOT/$OUT"

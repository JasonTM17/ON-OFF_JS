#!/bin/bash
CHROME="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
OUT_DIR="/mnt/d/ONOFF_JS/docs/screenshots"
BASE="http://localhost:3001"
TEMP_DIR=$(mktemp -d)

capture() {
  local url="$1"
  local name="$2"
  local width="${3:-1440}"
  local height="${4:-900}"

  echo "Capturing $name..."
  "$CHROME" --headless=new --no-sandbox --disable-gpu \
    --window-size="${width},${height}" \
    --screenshot="${TEMP_DIR}/${name}" \
    --hide-scrollbars \
    --disable-extensions \
    --user-data-dir="$TEMP_DIR/chrome-profile-$$" \
    "$url" 2>/dev/null

  if [ -f "${TEMP_DIR}/${name}" ]; then
    cp "${TEMP_DIR}/${name}" "${OUT_DIR}/${name}"
    echo "  -> Saved ${name}"
  else
    echo "  -> FAILED ${name}"
  fi
}

mkdir -p "$OUT_DIR"

# Desktop pages
capture "$BASE" "homepage.png" 1440 900
capture "$BASE/products" "products.png" 1440 900
capture "$BASE/checkout" "checkout.png" 1440 900
capture "$BASE/admin" "admin-dashboard.png" 1440 900

# Mobile
capture "$BASE" "mobile.png" 390 844

# Cleanup
rm -rf "$TEMP_DIR"

echo "Done! Screenshots in $OUT_DIR"
ls -la "$OUT_DIR"/*.png 2>/dev/null

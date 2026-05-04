#!/usr/bin/env bash
# exit on error
set -o errexit

npm install

# Explicitly download Chrome into Render's persistent cache dir
if [[ -z "$PUPPETEER_CACHE_DIR" ]]; then
  echo "PUPPETEER_CACHE_DIR is not set. Setting it to default /opt/render/.cache/puppeteer"
  export PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
fi

echo "Creating cache directory: $PUPPETEER_CACHE_DIR"
mkdir -p $PUPPETEER_CACHE_DIR

echo "Installing Chrome browser..."
npx puppeteer browsers install chrome

echo "Build script completed successfully!"
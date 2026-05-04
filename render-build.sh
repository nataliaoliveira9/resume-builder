#!/usr/bin/env bash
set -o errexit

npm install

# Explicitly download Chrome into Render's persistent cache dir
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
mkdir -p $PUPPETEER_CACHE_DIR

npx puppeteer browsers install chrome
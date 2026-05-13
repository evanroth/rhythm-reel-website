#!/bin/bash
set -e

# Commit any uncommitted changes before pushing
if ! git diff --quiet || ! git diff --cached --quiet; then
  git add -A
  git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
fi

git push origin main
ssh rhythmreelVPS@vps50136.dreamhostps.com "cd ~/rhythmreel && git pull origin main && npm ci && npm run build && pm2 restart rhythmreel"

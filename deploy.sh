#!/bin/bash
set -e

git push origin main
ssh rhythmreelVPS@vps50136.dreamhostps.com "cd ~/rhythmreel && git pull origin main && npm ci && npm run build && pm2 restart rhythmreel"

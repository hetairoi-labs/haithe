#!/bin/bash
set -e

source ~/.profile || true
source ~/.bashrc || true
export PATH="/root/.bun/bin:$PATH"

echo "✅ Environment loaded."

echo "👉 Pulling latest code..."
git pull origin main

echo "🔨 Building Rust server..."
cd ./cargo
cargo build --release

echo "⚙️ Restarting Rust server..."
pm2 restart haithe-server || pm2 start ecosystem.config.js --only haithe-server

echo "🖼️ Building and restarting Bun client..."
cd packages/server
bun install
bun run build
cd ../..
pm2 restart haithe-client || pm2 start ecosystem.config.js --only haithe-client

echo "✅ Deploy complete!"

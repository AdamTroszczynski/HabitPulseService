#!/bin/bash
echo "Starting backend services (without api)..."
cd "$(dirname "$0")/.."
docker compose up
#!/bin/bash
echo "Starting all backend services..."
cd "$(dirname "$0")/.."
docker compose --profile full up --build

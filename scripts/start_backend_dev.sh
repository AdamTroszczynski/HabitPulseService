#!/bin/bash
echo "Starting infrastructure..."
cd "$(dirname "$0")/.."
docker compose up

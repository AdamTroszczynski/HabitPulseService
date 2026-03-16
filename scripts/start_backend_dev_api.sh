#!/bin/bash
echo "Starting infrastructure + api..."
cd "$(dirname "$0")/.."
docker compose --profile api up

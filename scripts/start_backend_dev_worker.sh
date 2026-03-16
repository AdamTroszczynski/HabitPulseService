#!/bin/bash
echo "Starting infrastructure + worker..."
cd "$(dirname "$0")/.."
docker compose --profile worker up

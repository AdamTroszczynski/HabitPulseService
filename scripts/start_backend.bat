@echo off
echo Starting all backend services...
cd /d "%~dp0.."
docker compose --profile full up --build

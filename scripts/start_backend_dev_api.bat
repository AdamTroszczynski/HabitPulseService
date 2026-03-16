@echo off
echo Starting infrastructure without api...
cd /d "%~dp0.."
start cmd /k "docker compose --profile worker up"

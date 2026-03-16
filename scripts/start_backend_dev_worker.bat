@echo off
echo Starting infrastructure without worker...
cd /d "%~dp0.."
start cmd /k "docker compose --profile api up"

@echo off
echo Starting infrastructure...
cd /d "%~dp0.."
start cmd /k "docker compose up"

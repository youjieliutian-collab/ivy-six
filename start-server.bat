@echo off
cd /d "%~dp0"
start "" "http://localhost:8000/?v=wabi-4"
node server.js
pause

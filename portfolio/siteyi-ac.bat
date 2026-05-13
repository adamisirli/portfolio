@echo off
cd /d "%~dp0"
start "" "http://127.0.0.1:5500"
"C:\Program Files\nodejs\node.exe" serve-local.js
pause

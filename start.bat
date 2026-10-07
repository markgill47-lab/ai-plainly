@echo off
title AI, Plainly - Presentation Server
cd /d "%~dp0"

if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

echo Starting presentation at http://localhost:5173
echo Close this window to stop the server.
call npm run dev -- --open
pause

@echo off
echo ========================================
echo    STARTING CONTINUOUS AGENT SYSTEM
echo ========================================
echo.
echo This will start all 6 agents in continuous mode
echo They will run automatically every 6 hours
echo.
echo Press Ctrl+C to stop the agents at any time
echo.
pause

cd /d "%~dp0"
node scheduler.js



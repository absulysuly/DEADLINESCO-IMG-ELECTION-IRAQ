@echo off
echo ========================================
echo    NON-STOP AGENT MODE - MAXIMUM SPEED
echo ========================================
echo.
echo Agents will run EVERY 10 MINUTES!
echo.
echo This means:
echo - 144 cycles per day
echo - 6,912 candidates per day
echo - 2,880 venues per day  
echo - 4,320 posts per day
echo.
echo MASSIVE DATA COLLECTION!
echo.
echo Press Ctrl+C to stop anytime
echo.
pause

cd /d "%~dp0"
node scheduler_continuous.js



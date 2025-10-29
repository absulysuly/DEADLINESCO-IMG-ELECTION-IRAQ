@echo off
echo ========================================
echo    STOPPING AGENT SYSTEM
echo ========================================
echo.
echo Stopping all agent processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq scheduler.js*" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Agents stopped successfully
) else (
    echo ⚠️  No running agent processes found
)
echo.
pause



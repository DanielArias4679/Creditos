@echo off
cd /d "%~dp0"

echo === Iniciando la app local en http://localhost:3000 ===
start "ReactApp" cmd /k "npm start"

echo === Iniciando Cloudflare Tunnel ===
start "CloudflareTunnel" cmd /k "cloudflared tunnel --url http://localhost:3000"

echo.
echo ✅ Todo levantado. App en http://localhost:3000 y URL pública en trycloudflare.com
pause

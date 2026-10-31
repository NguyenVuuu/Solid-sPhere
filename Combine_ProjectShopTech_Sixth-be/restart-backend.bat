@echo off
echo Stopping any running Spring Boot application...
taskkill /f /im java.exe 2>nul

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Starting Spring Boot application...
call mvnw.cmd spring-boot:run

pause

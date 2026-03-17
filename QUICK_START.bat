@echo off
echo.
echo =========================================
echo University Inventory Hub - Quick Start
echo =========================================
echo.

echo Step 1: Starting MongoDB (ensure it's installed)
echo Note: Make sure MongoDB is running separately
echo To start MongoDB, run: mongod
echo.

echo Step 2: Building Backend...
cd backend
call mvn clean install
if errorlevel 1 (
    echo Error building backend. Make sure Maven is installed.
    pause
    exit /b 1
)
cd ..
echo Backend built successfully!
echo.

echo Step 3: Installing Frontend Dependencies...
call npm install
if errorlevel 1 (
    echo Error installing frontend dependencies. Make sure Node.js and npm are installed.
    pause
    exit /b 1
)
echo Frontend dependencies installed!
echo.

echo =========================================
echo Setup Complete!
echo =========================================
echo.
echo Next Steps:
echo 1. Open Command Prompt/Terminal 1: Start MongoDB
echo    - Run: mongod
echo.
echo 2. Open Command Prompt/Terminal 2: Start Backend
echo    - Navigate to backend folder
echo    - Run: mvn spring-boot:run
echo    - Backend will be available at: http://localhost:8085/api
echo.
echo 3. Open Command Prompt/Terminal 3: Start Frontend
echo    - From project root
echo    - Run: npm run dev
echo    - Frontend will be available at: http://localhost:5173
echo.
echo Test Accounts:
echo   Email: admin@eng.jfn.ac.lk
echo   Password: admin123
echo.
pause


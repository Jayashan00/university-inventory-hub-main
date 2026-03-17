#!/bin/bash

echo ""
echo "========================================="
echo "University Inventory Hub - Quick Start"
echo "========================================="
echo ""

echo "Step 1: Starting MongoDB (ensure it's installed)"
echo "Note: Make sure MongoDB is running separately"
echo "To start MongoDB, run: mongod"
echo ""

echo "Step 2: Building Backend..."
cd backend
mvn clean install
if [ $? -ne 0 ]; then
    echo "Error building backend. Make sure Maven is installed."
    exit 1
fi
cd ..
echo "Backend built successfully!"
echo ""

echo "Step 3: Installing Frontend Dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies. Make sure Node.js and npm are installed."
    exit 1
fi
echo "Frontend dependencies installed!"
echo ""

echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "Next Steps:"
echo "1. Open Terminal 1: Start MongoDB"
echo "   - Run: mongod"
echo ""
echo "2. Open Terminal 2: Start Backend"
echo "   - Navigate to backend folder"
echo "   - Run: mvn spring-boot:run"
echo "   - Backend will be available at: http://localhost:8085/api"
echo ""
echo "3. Open Terminal 3: Start Frontend"
echo "   - From project root"
echo "   - Run: npm run dev"
echo "   - Frontend will be available at: http://localhost:5173"
echo ""
echo "Test Accounts:"
echo "   Email: admin@eng.jfn.ac.lk"
echo "   Password: admin123"
echo ""


#!/bin/bash

# Job Portal - Setup & Run Script

echo "================================"
echo "Job Portal Application Setup"
echo "================================"
echo ""

# Check if backend directory exists
if [ -d "backend" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Backend dependencies installed"
fi

# Check if client directory exists
if [ -d "client" ]; then
    echo "📦 Installing client dependencies..."
    cd client
    npm install
    cd ..
    echo "✅ Client dependencies installed"
fi

echo ""
echo "================================"
echo "Checking Environment Files"
echo "================================"
echo ""

# Check backend .env
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found. Creating template..."
    cat > backend/.env << EOF
PORT=8000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
EOF
    echo "✅ Created backend/.env template"
fi

echo ""
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd client && npm run dev"
echo ""
echo "Backend will run on: http://localhost:8000"
echo "Frontend will run on: http://localhost:5173"
echo ""

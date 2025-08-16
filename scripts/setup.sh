#!/bin/bash

echo "🚀 Setting up Resume Builder Application"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version 20+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npm run db:generate

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your database configuration"
    echo "   - Set DATABASE_URL to your PostgreSQL connection string"
    echo "   - Optionally set AI_SERVICE_URL for AI agent integration"
else
    echo "✅ .env file already exists"
fi

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm test

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your database configuration"
echo "2. Set up a PostgreSQL database"
echo "3. Run 'npm run db:push' to create database tables"
echo "4. Start the development servers:"
echo "   - Frontend: npm run dev"
echo "   - Backend: npm run dev:server"
echo "   - Both: npm run dev:full"
echo ""
echo "Happy coding! 🚀"
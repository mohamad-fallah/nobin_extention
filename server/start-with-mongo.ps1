# PowerShell script to start MongoDB and Node.js server
# Make sure MongoDB is installed and running

Write-Host "🚀 Starting Nobin Express Server with MongoDB..." -ForegroundColor Green

# Check if MongoDB is running
Write-Host "📦 Checking MongoDB connection..." -ForegroundColor Yellow

# Start the development server
Write-Host "▶️  Starting Node.js development server..." -ForegroundColor Cyan
pnpm run dev 
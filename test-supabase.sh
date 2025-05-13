#!/bin/bash

# Test Supabase Implementation
# This script will test the Supabase implementation to ensure it works correctly

echo "🔍 Testing Supabase Implementation..."
echo "======================================"

# Navigate to project root
cd "$(dirname "$0")"

# Run the test script
node src/supabase/test.js

echo "======================================"
echo "✅ Test complete"

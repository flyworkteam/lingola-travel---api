#!/bin/bash

# Lingola Travel Backend API Test Script
# Quick test of all critical endpoints

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 Lingola Travel Backend API Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

BASE_URL="http://localhost:3000/api/v1"
PASSED=0
FAILED=0

test_endpoint() {
    local METHOD=$1
    local ENDPOINT=$2
    local DATA=$3
    local DESC=$4
    
    echo ""
    echo "📡 Testing: $DESC"
    echo "   Method: $METHOD | Endpoint: $ENDPOINT"
    
    if [ "$METHOD" == "GET" ]; then
        RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL$ENDPOINT")
    else
        RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL$ENDPOINT" \
            -H "Content-Type: application/json" \
            -d "$DATA")
    fi
    
    STATUS_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | head -n-1)
    
    if [ "$STATUS_CODE" -ge 200 ] && [ "$STATUS_CODE" -lt 300 ]; then
        echo "   ✅ Success (Status: $STATUS_CODE)"
        PASSED=$((PASSED + 1))
        
        # Show first 100 chars of response
        echo "   Response: ${BODY:0:100}..."
    else
        echo "   ❌ Failed (Status: $STATUS_CODE)"
        FAILED=$((FAILED + 1))
        echo "   Response: $BODY"
    fi
}

# Check if backend is running
echo ""
echo "Checking backend status..."
HEALTH=$(curl -s http://localhost:3000/health)
if [ $? -eq 0 ]; then
    echo "✅ Backend is running"
else
    echo "❌ Backend is not running!"
    echo ""
    echo "Please start backend first:"
    echo "  cd /Users/ismaildundar/Documents/androidCalismalari/lingola_travel_backend"
    echo "  npm run dev"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Running Tests..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Test 1: API Info
test_endpoint "GET" "/" "" "API Information"

# Test 2: Courses
test_endpoint "GET" "/courses" "" "Get All Courses"

# Test 3: Single Course
test_endpoint "GET" "/courses/course-001" "" "Get Course Details"

# Test 4: Course Lessons
test_endpoint "GET" "/courses/course-001/lessons" "" "Get Course Lessons"

# Test 5: Dictionary Categories
test_endpoint "GET" "/dictionary/categories" "" "Get Dictionary Categories"

# Test 6: Travel Phrases
test_endpoint "GET" "/travel-phrases" "" "Get Travel Phrases"

# Test 7: Anonymous Login
test_endpoint "POST" "/auth/anonymous" '{"deviceId":"test-device-bash-123"}' "Anonymous Login"

# Summary
TOTAL=$((PASSED + FAILED))
SUCCESS_RATE=$(( (PASSED * 100) / TOTAL ))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📊 Test Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Total Tests: $TOTAL"
echo "  ✅ Passed: $PASSED"
echo "  ❌ Failed: $FAILED"
echo "  Success Rate: $SUCCESS_RATE%"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 All tests passed! Backend is ready for testing."
else
    echo "⚠️  Some tests failed. Please check the output above."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

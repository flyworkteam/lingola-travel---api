import requests
import json

# Test configuration
BASE_URL = "http://localhost:3000/api/v1"

# Color codes for terminal
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def test_endpoint(method, endpoint, data=None, headers=None, description=""):
    """Test a single endpoint"""
    url = f"{BASE_URL}{endpoint}"
    print(f"\n{BLUE}Testing:{RESET} {description}")
    print(f"  Method: {method}")
    print(f"  URL: {url}")
    
    try:
        if method == "GET":
            response = requests.get(url, headers=headers, timeout=10)
        elif method == "POST":
            response = requests.post(url, json=data, headers=headers, timeout=10)
        else:
            print(f"{RED}✗ Unsupported method{RESET}")
            return False
        
        status = response.status_code
        
        if 200 <= status < 300:
            print(f"{GREEN}✓ Success{RESET} (Status: {status})")
            
            # Try to parse JSON response
            try:
                json_data = response.json()
                if json_data.get('success'):
                    print(f"  Response: {GREEN}success=True{RESET}")
                    if 'data' in json_data:
                        data_info = json_data['data']
                        if isinstance(data_info, dict):
                            print(f"  Data keys: {list(data_info.keys())}")
                        elif isinstance(data_info, list):
                            print(f"  Data count: {len(data_info)} items")
                else:
                    print(f"  Response: {YELLOW}success=False{RESET}")
                    if 'error' in json_data:
                        print(f"  Error: {json_data['error']}")
            except:
                print(f"  Raw response: {response.text[:100]}...")
            
            return True
        else:
            print(f"{RED}✗ Failed{RESET} (Status: {status})")
            print(f"  Response: {response.text[:200]}")
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"{RED}✗ Connection Error - Backend çalışmıyor mu?{RESET}")
        return False
    except requests.exceptions.Timeout:
        print(f"{RED}✗ Timeout{RESET}")
        return False
    except Exception as e:
        print(f"{RED}✗ Error: {str(e)}{RESET}")
        return False

def main():
    """Run all API tests"""
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}  Lingola Travel Backend API Test Suite{RESET}")
    print(f"{BLUE}{'='*60}{RESET}")
    
    results = []
    
    # Test 1: Health Check
    results.append(test_endpoint(
        "GET", 
        "/health".replace("/api/v1", ""),  # health is at root
        description="Health Check"
    ))
    
    # Test 2: API Info
    results.append(test_endpoint(
        "GET", 
        "/",
        description="API Information"
    ))
    
    # Test 3: Courses List
    results.append(test_endpoint(
        "GET",
        "/courses",
        description="Get All Courses"
    ))
    
    # Test 4: Single Course
    results.append(test_endpoint(
        "GET",
        "/courses/course-001",
        description="Get Course Details"
    ))
    
    # Test 5: Course Lessons
    results.append(test_endpoint(
        "GET",
        "/courses/course-001/lessons",
        description="Get Course Lessons"
    ))
    
    # Test 6: Dictionary Categories
    results.append(test_endpoint(
        "GET",
        "/dictionary/categories",
        description="Get Dictionary Categories"
    ))
    
    # Test 7: Travel Phrases
    results.append(test_endpoint(
        "GET",
        "/travel-phrases",
        description="Get Travel Phrases"
    ))
    
    # Test 8: Anonymous Login
    results.append(test_endpoint(
        "POST",
        "/auth/anonymous",
        data={"deviceId": "test-device-python-123"},
        description="Anonymous Login"
    ))
    
    # Summary
    print(f"\n{BLUE}{'='*60}{RESET}")
    print(f"{BLUE}  Test Summary{RESET}")
    print(f"{BLUE}{'='*60}{RESET}")
    
    passed = sum(results)
    total = len(results)
    
    print(f"\n  Total Tests: {total}")
    print(f"  {GREEN}Passed: {passed}{RESET}")
    print(f"  {RED}Failed: {total - passed}{RESET}")
    print(f"  Success Rate: {(passed/total)*100:.1f}%\n")
    
    if passed == total:
        print(f"{GREEN}✓ All tests passed! Backend is ready.{RESET}\n")
    else:
        print(f"{YELLOW}⚠ Some tests failed. Check the output above.{RESET}\n")

if __name__ == "__main__":
    # First check if backend is running
    print(f"\n{YELLOW}Checking if backend is running...{RESET}")
    try:
        response = requests.get("http://localhost:3000/health", timeout=5)
        if response.status_code == 200:
            print(f"{GREEN}✓ Backend is running!{RESET}")
            main()
        else:
            print(f"{RED}✗ Backend returned status {response.status_code}{RESET}")
    except requests.exceptions.ConnectionError:
        print(f"{RED}✗ Backend is not running!{RESET}")
        print(f"\n{YELLOW}Please start the backend first:{RESET}")
        print(f"  cd /Users/ismaildundar/Documents/androidCalismalari/lingola_travel_backend")
        print(f"  npm run dev\n")
    except Exception as e:
        print(f"{RED}✗ Error: {str(e)}{RESET}")

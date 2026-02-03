import requests
import sys
from datetime import datetime
import json

class BrechoMapAPITester:
    def __init__(self, base_url="https://geobrecho-finder.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_size": len(response.text) if response.text else 0
            }
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Parse response for additional validation
                try:
                    response_data = response.json()
                    result["response_data"] = response_data
                    
                    # Additional validation for locations endpoint
                    if endpoint == "api/locations" and response_data:
                        locations = response_data.get('locations', [])
                        total = response_data.get('total', 0)
                        last_updated = response_data.get('last_updated')
                        
                        print(f"   📍 Found {total} locations")
                        print(f"   🕒 Last updated: {last_updated}")
                        
                        # Check if locations have required fields
                        valid_locations = 0
                        geocoded_locations = 0
                        
                        for loc in locations:
                            if loc.get('name') and loc.get('city_state'):
                                valid_locations += 1
                            if loc.get('latitude') and loc.get('longitude'):
                                geocoded_locations += 1
                        
                        print(f"   ✓ Valid locations: {valid_locations}/{total}")
                        print(f"   🌍 Geocoded locations: {geocoded_locations}/{total}")
                        
                        result["locations_count"] = total
                        result["valid_locations"] = valid_locations
                        result["geocoded_locations"] = geocoded_locations
                        
                except json.JSONDecodeError:
                    print(f"   ⚠️  Response is not valid JSON")
                    result["json_valid"] = False
                    
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Error: {response.text[:200]}...")

            self.test_results.append(result)
            return success, response.json() if success and response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout}s")
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "success": False,
                "error": "Timeout"
            }
            self.test_results.append(result)
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "success": False,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_locations_endpoint(self):
        """Test the locations endpoint"""
        return self.run_test(
            "Locations Endpoint",
            "GET",
            "api/locations",
            200,
            timeout=60  # Longer timeout for Google Sheets fetch + geocoding
        )

    def test_locations_force_refresh(self):
        """Test the locations endpoint with force refresh"""
        return self.run_test(
            "Locations Force Refresh",
            "GET",
            "api/locations?force_refresh=true",
            200,
            timeout=90  # Even longer timeout for fresh data
        )

    def test_cors_headers(self):
        """Test CORS headers"""
        url = f"{self.base_url}/api/"
        
        print(f"\n🔍 Testing CORS Headers...")
        try:
            response = requests.options(url, headers={
                'Origin': 'https://geobrecho-finder.preview.emergentagent.com',
                'Access-Control-Request-Method': 'GET'
            })
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            print(f"✅ CORS Headers: {cors_headers}")
            return True
            
        except Exception as e:
            print(f"❌ CORS Test Failed: {str(e)}")
            return False

def main():
    print("🗺️  Starting Brecho Map API Tests")
    print("=" * 50)
    
    # Setup
    tester = BrechoMapAPITester()
    
    # Run tests
    print("\n📡 Testing Backend API Endpoints...")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test CORS
    tester.test_cors_headers()
    
    # Test locations endpoint (cached)
    tester.test_locations_endpoint()
    
    # Test locations with force refresh
    print("\n⏳ Testing force refresh (this may take longer)...")
    tester.test_locations_force_refresh()

    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        
        # Print failed tests summary
        failed_tests = [t for t in tester.test_results if not t.get('success', False)]
        if failed_tests:
            print("\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"   - {test['test_name']}: {test.get('error', 'Status code mismatch')}")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())
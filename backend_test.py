#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Prajwal H S Portfolio
Tests all backend endpoints with realistic data
"""

import requests
import json
import sys
import os
from datetime import datetime
import uuid

# Get backend URL from frontend environment
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("❌ Could not get backend URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"🔗 Testing backend at: {API_BASE}")

# Test data - realistic portfolio contact form data
TEST_CONTACT_DATA = {
    "name": "Sarah Johnson",
    "email": "sarah.johnson@techcorp.com",
    "subject": "Full-Stack Developer Position Inquiry",
    "message": "Hi Prajwal, I came across your portfolio and I'm impressed with your work. We have an exciting full-stack developer position at TechCorp that might interest you. Would you be available for a brief call this week to discuss the opportunity? Looking forward to hearing from you!"
}

TEST_CONTACT_DATA_2 = {
    "name": "Michael Chen",
    "email": "m.chen@startupventures.io",
    "subject": "Freelance Project Collaboration",
    "message": "Hello Prajwal, I'm reaching out regarding a potential freelance project. We're building a modern web application for our startup and need someone with your React and FastAPI expertise. The project involves creating a dashboard with real-time analytics. Are you currently available for freelance work?"
}

def test_health_check():
    """Test 1: Health Check - Test the root endpoint /api/"""
    print("\n🔍 Test 1: Health Check Endpoint")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {data}")
            if "message" in data and "status" in data:
                print("   ✅ Health check passed - API is running")
                return True
            else:
                print("   ❌ Health check failed - Invalid response format")
                return False
        else:
            print(f"   ❌ Health check failed - Status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Health check failed - Connection error: {e}")
        return False

def test_contact_form_submission():
    """Test 2: Contact Form API - Test POST /api/contact"""
    print("\n🔍 Test 2: Contact Form Submission")
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=TEST_CONTACT_DATA,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {data}")
            if data.get("success") and data.get("id"):
                print("   ✅ Contact form submission successful")
                return data.get("id")  # Return the ID for further tests
            else:
                print("   ❌ Contact form submission failed - Invalid response")
                return None
        else:
            print(f"   ❌ Contact form submission failed - Status code: {response.status_code}")
            try:
                error_data = response.json()
                print(f"   Error details: {error_data}")
            except:
                print(f"   Error text: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Contact form submission failed - Connection error: {e}")
        return None

def test_get_all_messages():
    """Test 3: Get Messages API - Test GET /api/contact"""
    print("\n🔍 Test 3: Get All Contact Messages")
    try:
        response = requests.get(f"{API_BASE}/contact", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Found {len(data)} messages")
            if isinstance(data, list):
                if len(data) > 0:
                    # Check first message structure
                    first_msg = data[0]
                    required_fields = ["id", "name", "email", "subject", "message", "timestamp", "status"]
                    if all(field in first_msg for field in required_fields):
                        print("   ✅ Get all messages successful - Valid message structure")
                        return data
                    else:
                        print("   ❌ Get all messages failed - Invalid message structure")
                        return None
                else:
                    print("   ✅ Get all messages successful - No messages found (empty list)")
                    return data
            else:
                print("   ❌ Get all messages failed - Response is not a list")
                return None
        else:
            print(f"   ❌ Get all messages failed - Status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Get all messages failed - Connection error: {e}")
        return None

def test_get_specific_message(message_id):
    """Test 4: Individual Message API - Test GET /api/contact/{id}"""
    print(f"\n🔍 Test 4: Get Specific Message (ID: {message_id})")
    if not message_id:
        print("   ⚠️  Skipping - No message ID available")
        return False
        
    try:
        response = requests.get(f"{API_BASE}/contact/{message_id}", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Message: {data.get('name')} - {data.get('subject')}")
            required_fields = ["id", "name", "email", "subject", "message", "timestamp", "status"]
            if all(field in data for field in required_fields):
                print("   ✅ Get specific message successful")
                return True
            else:
                print("   ❌ Get specific message failed - Invalid message structure")
                return False
        elif response.status_code == 404:
            print("   ❌ Get specific message failed - Message not found")
            return False
        else:
            print(f"   ❌ Get specific message failed - Status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Get specific message failed - Connection error: {e}")
        return False

def test_update_message_status(message_id):
    """Test 5: Status Update API - Test PUT /api/contact/{id}/status"""
    print(f"\n🔍 Test 5: Update Message Status (ID: {message_id})")
    if not message_id:
        print("   ⚠️  Skipping - No message ID available")
        return False
        
    try:
        # Test updating status to "read"
        response = requests.put(
            f"{API_BASE}/contact/{message_id}/status",
            params={"status": "read"},
            timeout=10
        )
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {data}")
            if data.get("success"):
                print("   ✅ Update message status successful")
                return True
            else:
                print("   ❌ Update message status failed - Success flag is false")
                return False
        elif response.status_code == 404:
            print("   ❌ Update message status failed - Message not found")
            return False
        else:
            print(f"   ❌ Update message status failed - Status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Update message status failed - Connection error: {e}")
        return False

def test_portfolio_stats():
    """Test 6: Portfolio Stats API - Test GET /api/stats"""
    print("\n🔍 Test 6: Portfolio Statistics")
    try:
        response = requests.get(f"{API_BASE}/stats", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Stats: {data}")
            required_fields = ["total_messages", "messages_this_month", "last_updated"]
            if all(field in data for field in required_fields):
                print("   ✅ Portfolio stats successful")
                return True
            else:
                print("   ❌ Portfolio stats failed - Invalid stats structure")
                return False
        else:
            print(f"   ❌ Portfolio stats failed - Status code: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Portfolio stats failed - Connection error: {e}")
        return False

def test_error_handling():
    """Test 7: Error Handling - Test invalid requests"""
    print("\n🔍 Test 7: Error Handling")
    
    # Test 1: Invalid contact data (missing required fields)
    print("   Testing invalid contact data...")
    try:
        invalid_data = {"name": "Test"}  # Missing required fields
        response = requests.post(
            f"{API_BASE}/contact",
            json=invalid_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        if response.status_code in [400, 422]:  # FastAPI returns 422 for validation errors
            print("   ✅ Invalid data handling works correctly")
        else:
            print(f"   ❌ Invalid data handling failed - Expected 400/422, got {response.status_code}")
            return False
    except Exception as e:
        print(f"   ❌ Error testing invalid data: {e}")
        return False
    
    # Test 2: Non-existent message ID
    print("   Testing non-existent message ID...")
    try:
        fake_id = str(uuid.uuid4())
        response = requests.get(f"{API_BASE}/contact/{fake_id}", timeout=10)
        if response.status_code == 404:
            print("   ✅ Non-existent ID handling works correctly")
        else:
            print(f"   ❌ Non-existent ID handling failed - Expected 404, got {response.status_code}")
            return False
    except Exception as e:
        print(f"   ❌ Error testing non-existent ID: {e}")
        return False
    
    print("   ✅ Error handling tests passed")
    return True

def test_cors_headers():
    """Test 8: CORS Setup - Verify CORS headers"""
    print("\n🔍 Test 8: CORS Headers")
    try:
        response = requests.options(f"{API_BASE}/contact", timeout=10)
        headers = response.headers
        
        cors_headers = [
            'access-control-allow-origin',
            'access-control-allow-methods',
            'access-control-allow-headers'
        ]
        
        cors_present = any(header in headers for header in cors_headers)
        
        if cors_present:
            print("   ✅ CORS headers are properly configured")
            return True
        else:
            print("   ⚠️  CORS headers not found in OPTIONS response")
            # Try a regular GET request to check CORS headers
            response = requests.get(f"{API_BASE}/", timeout=10)
            headers = response.headers
            cors_present = any(header in headers for header in cors_headers)
            if cors_present:
                print("   ✅ CORS headers found in regular response")
                return True
            else:
                print("   ❌ CORS headers not properly configured")
                return False
    except requests.exceptions.RequestException as e:
        print(f"   ❌ CORS test failed - Connection error: {e}")
        return False

def run_comprehensive_backend_tests():
    """Run all backend tests in sequence"""
    print("=" * 60)
    print("🚀 PRAJWAL H S PORTFOLIO - BACKEND API TESTING")
    print("=" * 60)
    
    test_results = {}
    message_id = None
    
    # Test 1: Health Check
    test_results['health_check'] = test_health_check()
    
    # Test 2: Contact Form Submission
    message_id = test_contact_form_submission()
    test_results['contact_submission'] = message_id is not None
    
    # Add a second message for better testing
    if message_id:
        print("\n🔍 Adding second test message...")
        second_id = test_contact_form_submission_2()
        if second_id:
            print("   ✅ Second message added successfully")
    
    # Test 3: Get All Messages
    messages = test_get_all_messages()
    test_results['get_all_messages'] = messages is not None
    
    # Test 4: Get Specific Message
    test_results['get_specific_message'] = test_get_specific_message(message_id)
    
    # Test 5: Update Message Status
    test_results['update_status'] = test_update_message_status(message_id)
    
    # Test 6: Portfolio Stats
    test_results['portfolio_stats'] = test_portfolio_stats()
    
    # Test 7: Error Handling
    test_results['error_handling'] = test_error_handling()
    
    # Test 8: CORS Headers
    test_results['cors_headers'] = test_cors_headers()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    passed = sum(test_results.values())
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"   {test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\n🎯 Overall Result: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL BACKEND TESTS PASSED! Portfolio API is working correctly.")
        return True
    else:
        print("⚠️  Some tests failed. Please check the issues above.")
        return False

def test_contact_form_submission_2():
    """Submit second test message"""
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=TEST_CONTACT_DATA_2,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        if response.status_code == 200:
            data = response.json()
            return data.get("id")
    except:
        pass
    return None

if __name__ == "__main__":
    success = run_comprehensive_backend_tests()
    sys.exit(0 if success else 1)
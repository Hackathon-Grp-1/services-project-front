const axios = require('axios');

const API_BASE_URL = 'http://localhost:3007/api/v1';

// Mock token for testing
const mockToken = 'Bearer mock-jwt-token';

const testServicesAPI = async () => {
  console.log('🧪 Testing Services API...\n');

  try {
    // Test 1: Get user services
    console.log('1. Testing GET /api/v1/services');
    const servicesResponse = await axios.get(`${API_BASE_URL}/services`, {
      headers: {
        'Authorization': mockToken,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Services fetched successfully:', servicesResponse.data);
    console.log('');

    // Test 2: Create a new service
    console.log('2. Testing POST /api/v1/services');
    const newService = {
      title: 'Développement Application React',
      description: 'Création d\'une application React moderne avec TypeScript, Material UI et API REST.',
      category: 'Développement',
      price: 2500,
      duration: 40,
      skills: ['React', 'TypeScript', 'Material UI', 'REST API']
    };

    const createResponse = await axios.post(`${API_BASE_URL}/services`, newService, {
      headers: {
        'Authorization': mockToken,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Service created successfully:', createResponse.data);
    console.log('');

    // Test 3: Update service status
    if (createResponse.data.id) {
      console.log('3. Testing PUT /api/v1/services/:id (status update)');
      const updateResponse = await axios.put(
        `${API_BASE_URL}/services/${createResponse.data.id}`,
        { status: 'active' },
        {
          headers: {
            'Authorization': mockToken,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('✅ Service updated successfully:', updateResponse.data);
      console.log('');
    }

  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('❌ Network Error: No response received');
      console.log('💡 Make sure the API server is running on http://localhost:3007');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
};

// Run the test
testServicesAPI(); 
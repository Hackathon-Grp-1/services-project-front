// Script de test pour l'API de chat
const axios = require('axios');

const API_URL = 'https://n8n.labodolivier.com/webhook/hackathon';

// Test pour la création de service
async function testCreateService() {
  try {
    const requestData = {
      request: "CHAT_CREATE_SERVICE",
      prompt: "Bonjour, j'aimerai proposer mes services de développement web. Je suis développeur freelance avec 5 ans d'expérience en React, Node.js et MongoDB. Mon taux horaire est de 75€.",
      id_session: "test-session-" + Date.now()
    };
    
    console.log('Envoi de la requête de création de service:', requestData);
    
    const response = await axios.post(API_URL, requestData);
    
    console.log('Réponse reçue:', {
      status: response.status,
      data: response.data
    });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors du test:', error.response?.data || error.message);
    throw error;
  }
}

// Test pour la recherche de services
async function testSearchServices() {
  try {
    const requestData = {
      request: "SEARCH_SERVICES",
      prompt: "Je cherche un développeur web pour créer un site e-commerce",
      id_session: "test-session-" + Date.now()
    };
    
    console.log('Envoi de la requête de recherche:', requestData);
    
    const response = await axios.post(API_URL, requestData);
    
    console.log('Réponse reçue:', {
      status: response.status,
      data: response.data
    });
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors du test:', error.response?.data || error.message);
    throw error;
  }
}

// Exécution des tests
async function runTests() {
  console.log('=== Test de création de service ===');
  try {
    await testCreateService();
  } catch (error) {
    console.log('Test de création de service échoué');
  }
  
  console.log('\n=== Test de recherche de services ===');
  try {
    await testSearchServices();
  } catch (error) {
    console.log('Test de recherche de services échoué');
  }
}

// Exécuter les tests si le script est appelé directement
if (require.main === module) {
  runTests();
}

module.exports = {
  testCreateService,
  testSearchServices
}; 
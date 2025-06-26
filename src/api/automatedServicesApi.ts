import type {
  AutomatedService,
  CreateAutomatedServiceRequest,
  ServiceExecutionRequest,
  ServiceExecutionResponse
} from '../types/automatedService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Mock data pour les tests
const mockServices: AutomatedService[] = [
  {
    id: '1',
    name: 'Traducteur IA',
    description: 'Service de traduction automatique utilisant l\'intelligence artificielle pour traduire du texte dans différentes langues.',
    category: 'Traduction',
    provider: {
      id: 'user1',
      name: 'Olivier Perdrix',
      avatar: 'https://via.placeholder.com/40'
    },
    pricing: {
      type: 'per_request',
      amount: 0.10,
      currency: 'EUR'
    },
    configuration: {
      endpoint: 'https://n8n.labodolivier.com/webhook/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      bodyTemplate: JSON.stringify({
        prompt: '{{input.text}}'
      }, null, 2),
      responseMapping: {
        'translation': '$.translation',
        'sourceLanguage': '$.sourceLanguage',
        'targetLanguage': '$.targetLanguage'
      }
    },
    usage: {
      totalRequests: 150,
      averageRating: 4.8,
      isActive: true
    },
    metadata: {
      tags: ['traduction', 'IA', 'multilingue'],
      examples: [
        {
          input: { text: 'Hello world' },
          output: { translation: 'Bonjour le monde', sourceLanguage: 'en', targetLanguage: 'fr' },
          description: 'Traduction simple anglais vers français'
        }
      ]
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Love Message Bot',
    description: 'Ce bot reformule vos textes pour les rendre bienveillants et positifs.',
    category: 'Remaniement',
    provider: {
      id: 'user1',
      name: 'Audrey HOSSEPIAN',
      avatar: 'https://via.placeholder.com/40'
    },
    pricing: {
      type: 'per_request',
      amount: 0.10,
      currency: 'EUR'
    },
    configuration: {
      endpoint: 'https://n8n.labodolivier.com/webhook/lovemsg',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      bodyTemplate: JSON.stringify({
        prompt: '{{input.text}}'
      }, null, 2),
      responseMapping: {
        'remaniement': '$.remaniement',
        'original': '$.original',
      }
    },
    usage: {
      totalRequests: 42,
      averageRating: 4.9,
      isActive: true
    },
    metadata: {
      tags: ['remaniement', 'bienveillance', 'positif', 'IA'],
      examples: [
        {
          input: { text: 'Tu es nul, tu n\'as rien compris.' },
          output: { remaniement: 'Je pense que tu pourrais essayer une autre approche, tu vas y arriver !', original: 'Tu es nul, tu n\'as rien compris.' },
          description: 'Remaniement d\'un message négatif en message bienveillant.'
        }
      ]
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

// Récupérer tous les services automatisés
export const getAutomatedServices = async (): Promise<AutomatedService[]> => {
  try {
    // En production, remplacer par un vrai appel API
    // const response = await fetch(`${API_BASE_URL}/automated-services`);
    // return response.json();

    // Mock pour le développement
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServices), 500);
    });
  } catch (error) {
    console.error('Error fetching automated services:', error);
    throw error;
  }
};

// Récupérer un service par ID
export const getAutomatedServiceById = async (id: string): Promise<AutomatedService | null> => {
  try {
    // En production, remplacer par un vrai appel API
    // const response = await fetch(`${API_BASE_URL}/automated-services/${id}`);
    // return response.json();

    // Mock pour le développement
    const service = mockServices.find(s => s.id === id);
    return new Promise((resolve) => {
      setTimeout(() => resolve(service || null), 300);
    });
  } catch (error) {
    console.error('Error fetching automated service:', error);
    throw error;
  }
};

// Créer un nouveau service automatisé
export const createAutomatedService = async (service: CreateAutomatedServiceRequest): Promise<AutomatedService> => {
  try {
    // En production, remplacer par un vrai appel API
    // const response = await fetch(`${API_BASE_URL}/automated-services`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(service)
    // });
    // return response.json();

    // Mock pour le développement
    const newService: AutomatedService = {
      ...service,
      id: Date.now().toString(),
      provider: {
        id: 'current-user',
        name: 'Utilisateur actuel'
      },
      usage: {
        totalRequests: 0,
        averageRating: 0,
        isActive: true
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(newService), 1000);
    });
  } catch (error) {
    console.error('Error creating automated service:', error);
    throw error;
  }
};

// Exécuter un service automatisé
export const executeAutomatedService = async (request: ServiceExecutionRequest): Promise<ServiceExecutionResponse> => {
  try {
    const startTime = Date.now();

    // Récupérer la configuration du service
    const service = await getAutomatedServiceById(request.serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Préparer la requête selon la configuration
    const { endpoint, method, headers, bodyTemplate } = service.configuration;

    let body: any = null;
    if (method === 'POST' && bodyTemplate) {
      // Remplacer les variables dans le template
      body = JSON.parse(bodyTemplate.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
        const keys = path.split('.');
        let value = request.input;
        for (const key of keys) {
          value = value?.[key];
        }
        return JSON.stringify(value || '');
      }));
    }

    // Exécuter la requête
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: method === 'POST' ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const executionTime = Date.now() - startTime;

    // Calculer le coût si applicable
    let cost = 0;
    if (service.pricing.type === 'per_request' && service.pricing.amount) {
      cost = service.pricing.amount;
    }

    return {
      success: true,
      result,
      executionTime,
      cost
    };

  } catch (error) {
    console.error('Error executing automated service:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      executionTime: 0
    };
  }
};

// Tester un service automatisé (pour la création)
export const testAutomatedService = async (configuration: CreateAutomatedServiceRequest['configuration'], testInput: any): Promise<ServiceExecutionResponse> => {
  try {
    const startTime = Date.now();

    const { endpoint, method, headers, bodyTemplate } = configuration;

    let body: any = null;
    if (method === 'POST' && bodyTemplate) {
      body = JSON.parse(bodyTemplate.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
        const keys = path.split('.');
        let value = testInput;
        for (const key of keys) {
          value = value?.[key];
        }
        return JSON.stringify(value || '');
      }));
    }

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: method === 'POST' ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const executionTime = Date.now() - startTime;

    return {
      success: true,
      result,
      executionTime
    };

  } catch (error) {
    console.error('Error testing automated service:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      executionTime: 0
    };
  }
}; 
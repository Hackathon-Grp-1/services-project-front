// Define types for our service paths
export interface ServiceStep {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  price: number; // in euros
  type: 'human' | 'ai';
}

export interface ServicePath {
  id: string;
  title: string;
  description: string;
  totalDuration: number; // in days
  totalPrice: number; // in euros
  steps: ServiceStep[];
}

// Mock function to simulate API call
export const fetchServicePaths = async (prompt: string): Promise<ServicePath[]> => {
  console.log('Prompt received:', prompt);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response with 3 different service paths
  return [
    {
      id: 'path-1',
      title: 'Développement Agile Complet',
      description: 'Une approche agile de bout en bout pour développer votre solution',
      totalDuration: 45,
      totalPrice: 9750,
      steps: [
        {
          id: 'step-1-1',
          title: 'Analyse des besoins & wireframing',
          description: 'Définition précise des besoins et création de maquettes basse fidélité',
          duration: 7,
          price: 1400,
          type: 'human'
        },
        {
          id: 'step-1-2',
          title: 'Design UX/UI',
          description: 'Conception de l\'interface utilisateur et expérience utilisateur',
          duration: 10,
          price: 2300,
          type: 'human'
        },
        {
          id: 'step-1-3',
          title: 'Développement MVP',
          description: 'Développement d\'un produit minimum viable',
          duration: 18,
          price: 4500,
          type: 'human'
        },
        {
          id: 'step-1-4',
          title: 'Tests & Déploiement',
          description: 'Tests de qualité et mise en production',
          duration: 10,
          price: 1550,
          type: 'human'
        }
      ]
    },
    {
      id: 'path-2',
      title: 'Solution Hybride IA-Expert',
      description: 'Combinaison de l\'IA et d\'expertise humaine pour un développement optimal',
      totalDuration: 30,
      totalPrice: 8200,
      steps: [
        {
          id: 'step-2-1',
          title: 'Analyse automatique des besoins',
          description: 'Analyse de vos besoins et génération de spécifications par IA',
          duration: 3,
          price: 800,
          type: 'ai'
        },
        {
          id: 'step-2-2',
          title: 'Design UX/UI par IA',
          description: 'Génération et itération de designs par intelligence artificielle',
          duration: 5,
          price: 1200,
          type: 'ai'
        },
        {
          id: 'step-2-3',
          title: 'Développement par experts',
          description: 'Codage par une équipe de développeurs expérimentés',
          duration: 15,
          price: 4500,
          type: 'human'
        },
        {
          id: 'step-2-4',
          title: 'Tests automatisés & manuels',
          description: 'Combinaison de tests automatisés par IA et de validation humaine',
          duration: 7,
          price: 1700,
          type: 'human'
        }
      ]
    },
    {
      id: 'path-3',
      title: 'Solution IA Accélérée',
      description: 'Développement ultra-rapide principalement basé sur l\'IA',
      totalDuration: 20,
      totalPrice: 6500,
      steps: [
        {
          id: 'step-3-1',
          title: 'Spécification IA',
          description: 'Génération automatique des spécifications fonctionnelles et techniques',
          duration: 2,
          price: 600,
          type: 'ai'
        },
        {
          id: 'step-3-2',
          title: 'Prototypage rapide IA',
          description: 'Génération de prototypes fonctionnels par intelligence artificielle',
          duration: 4,
          price: 1100,
          type: 'ai'
        },
        {
          id: 'step-3-3',
          title: 'Développement IA assisté',
          description: 'Codage automatique avec supervision humaine',
          duration: 10,
          price: 3800,
          type: 'ai'
        },
        {
          id: 'step-3-4',
          title: 'Validation expert & déploiement',
          description: 'Révision finale par un expert et mise en production',
          duration: 4,
          price: 1000,
          type: 'human'
        }
      ]
    }
  ];
};

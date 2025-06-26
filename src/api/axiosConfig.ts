import axios from 'axios';
import { logout } from './authApi';

// Configuration de base d'axios
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3007/api/v1';

// Créer une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter automatiquement le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si l'erreur est 401 (Unauthorized), déconnecter l'utilisateur
    if (error.response?.status === 401) {
      console.log('Token invalide ou expiré, déconnexion automatique');
      logout();
      
      // Rediriger vers la page de connexion si on est sur une page protégée
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient; 
import axios from 'axios';
import { authHeader } from './authApi';

const API_BASE_URL = 'http://localhost:3007/api/v1';

// Types pour les services
export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number; // en heures
  status: 'active' | 'inactive' | 'draft';
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCreateRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  skills: string[];
}

export interface ServiceUpdateRequest extends Partial<ServiceCreateRequest> {
  status?: 'active' | 'inactive' | 'draft';
}

export interface ServicesResponse {
  services: Service[];
  total: number;
  page: number;
  limit: number;
}

// Récupérer tous les services de l'utilisateur
export const getUserServices = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  status?: string
): Promise<ServicesResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (category) params.append('category', category);
    if (status) params.append('status', status);

    const response = await axios.get(
      `${API_BASE_URL}/services?${params.toString()}`,
      { headers: authHeader() }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching user services:', error);
    throw error;
  }
};

// Créer un nouveau service
export const createService = async (serviceData: ServiceCreateRequest): Promise<Service> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/services`,
      serviceData,
      { headers: authHeader() }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Mettre à jour un service
export const updateService = async (
  serviceId: string,
  serviceData: ServiceUpdateRequest
): Promise<Service> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/services/${serviceId}`,
      serviceData,
      { headers: authHeader() }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// Supprimer un service
export const deleteService = async (serviceId: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_BASE_URL}/services/${serviceId}`,
      { headers: authHeader() }
    );
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Récupérer un service spécifique
export const getService = async (serviceId: string): Promise<Service> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/services/${serviceId}`,
      { headers: authHeader() }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching service:', error);
    throw error;
  }
}; 
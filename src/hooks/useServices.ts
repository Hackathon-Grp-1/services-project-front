import { useCallback, useEffect, useState } from 'react';
import {
  createService,
  deleteService,
  getUserServices,
  updateService,
  type Service,
  type ServiceCreateRequest,
  type ServiceUpdateRequest,
  type ServicesResponse
} from '../api/servicesApi';

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  fetchServices: (page?: number, filters?: { category?: string; status?: string }) => Promise<void>;
  createNewService: (serviceData: ServiceCreateRequest) => Promise<Service>;
  updateExistingService: (serviceId: string, serviceData: ServiceUpdateRequest) => Promise<Service>;
  removeService: (serviceId: string) => Promise<void>;
  clearError: () => void;
}

export const useServices = (initialPage: number = 1, initialLimit: number = 10): UseServicesReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(initialLimit);

  const fetchServices = useCallback(async (
    newPage?: number,
    filters?: { category?: string; status?: string }
  ) => {
    setLoading(true);
    setError(null);

    try {
      const currentPage = newPage ?? page;
      const response: ServicesResponse = await getUserServices(
        currentPage,
        limit,
        filters?.category,
        filters?.status
      );

      setServices(response.services);
      setTotal(response.total);
      setPage(response.page);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erreur lors du chargement des services';
      setError(errorMessage);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  const createNewService = useCallback(async (serviceData: ServiceCreateRequest): Promise<Service> => {
    setLoading(true);
    setError(null);

    try {
      const newService = await createService(serviceData);

      // Refresh the services list
      await fetchServices();

      return newService;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erreur lors de la création du service';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchServices]);

  const updateExistingService = useCallback(async (
    serviceId: string,
    serviceData: ServiceUpdateRequest
  ): Promise<Service> => {
    setLoading(true);
    setError(null);

    try {
      const updatedService = await updateService(serviceId, serviceData);

      // Update the service in the local state
      setServices(prevServices =>
        prevServices.map(service =>
          service.id === serviceId ? updatedService : service
        )
      );

      return updatedService;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erreur lors de la mise à jour du service';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeService = useCallback(async (serviceId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await deleteService(serviceId);

      // Remove the service from the local state
      setServices(prevServices =>
        prevServices.filter(service => service.id !== serviceId)
      );

      // Update total count
      setTotal(prevTotal => prevTotal - 1);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Erreur lors de la suppression du service';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load initial services
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return {
    services,
    loading,
    error,
    total,
    page,
    limit,
    fetchServices,
    createNewService,
    updateExistingService,
    removeService,
    clearError
  };
}; 
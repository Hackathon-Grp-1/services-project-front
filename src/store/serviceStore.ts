import { create } from 'zustand';
import type { ServicePath } from '../api/mockApi';

interface ServiceState {
  // Current user need/prompt
  prompt: string;
  setPrompt: (prompt: string) => void;
  
  // Service paths returned from API
  servicePaths: ServicePath[];
  setServicePaths: (paths: ServicePath[]) => void;
  
  // Selected service path
  selectedPath: ServicePath | null;
  selectPath: (path: ServicePath) => void;
  
  // Loading state for API calls
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  
  // Reset the store to initial state
  reset: () => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  prompt: '',
  setPrompt: (prompt) => set({ prompt }),
  
  servicePaths: [],
  setServicePaths: (paths) => set({ servicePaths: paths }),
  
  selectedPath: null,
  selectPath: (path) => set({ selectedPath: path }),
  
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  
  reset: () => set({
    prompt: '',
    servicePaths: [],
    selectedPath: null,
    isLoading: false,
  }),
}));

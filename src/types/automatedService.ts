export interface AutomatedService {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: {
    id: string;
    name: string;
    avatar?: string;
  };
  pricing: {
    type: 'per_request' | 'subscription' | 'free';
    amount?: number;
    currency?: string;
  };
  configuration: {
    endpoint: string;
    method: 'GET' | 'POST';
    headers?: Record<string, string>;
    bodyTemplate?: string;
    responseMapping?: Record<string, string>;
  };
  usage: {
    totalRequests: number;
    averageRating: number;
    isActive: boolean;
  };
  metadata: {
    tags: string[];
    examples: Array<{
      input: any;
      output: any;
      description: string;
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAutomatedServiceRequest {
  name: string;
  description: string;
  category: string;
  pricing: {
    type: 'per_request' | 'subscription' | 'free';
    amount?: number;
    currency?: string;
  };
  configuration: {
    endpoint: string;
    method: 'GET' | 'POST';
    headers?: Record<string, string>;
    bodyTemplate?: string;
    responseMapping?: Record<string, string>;
  };
  metadata: {
    tags: string[];
    examples: Array<{
      input: any;
      output: any;
      description: string;
    }>;
  };
}

export interface ServiceExecutionRequest {
  serviceId: string;
  input: any;
  userId: string;
}

export interface ServiceExecutionResponse {
  success: boolean;
  result?: any;
  error?: string;
  executionTime: number;
  cost?: number;
} 
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://n8n.labodolivier.com/webhook/hackathon';

// Type pour la requête
export interface ChatRequest {
  request: string;
  prompt: string;
  id_session: string;
}

// Type pour la requête de création de service
export interface CreateServiceRequest {
  request: "CHAT_CREATE_SERVICE";
  prompt: string;
  id_session: string;
}

// Type pour la réponse
export interface ChatResponse {
  // Format d'ancien système
  data?: Array<{
    output: string | {
      message: string;
      commands: string;
      [key: string]: any;
    };
    [key: string]: any;
  }>;

  // Nouveau format n8n
  message?: string;
  ready?: boolean;
  professionals?: Array<{
    id: number;
    description: string;
    [key: string]: any;
  }>;
  request?: {
    request: string;
    prompt: string;
    id_session: string;
  };
  [key: string]: any; // Pour les propriétés supplémentaires
}

// Classe pour gérer les sessions de chat
class ChatSession {
  private static instance: ChatSession;
  private sessionId: string;

  private constructor() {
    this.sessionId = uuidv4();
  }

  public static getInstance(): ChatSession {
    if (!ChatSession.instance) {
      ChatSession.instance = new ChatSession();
    }
    return ChatSession.instance;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public resetSession(): void {
    this.sessionId = uuidv4();
  }
}

// Fonction pour envoyer un message au webhook
// Variable pour compter les appels
let sendPromptCounter = 0;

export const sendPrompt = async (prompt: string): Promise<ChatResponse> => {
  sendPromptCounter++;
  console.log(`sendPrompt appelé ${sendPromptCounter} fois avec le même prompt`);
  
  try {
    const sessionId = ChatSession.getInstance().getSessionId();
    
    const requestData: ChatRequest = {
      request: "SEARCH_SERVICES",
      prompt,
      id_session: sessionId
    };
    
    console.log('Envoi de la requête au webhook:', {
      url: API_URL,
      sessionId,
      callCount: sendPromptCounter,
      prompt: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : '')
    });
    
    const startTime = Date.now();
    const response = await axios.post(API_URL, requestData);
    const endTime = Date.now();
    
    console.log(`Réponse reçue du webhook (${endTime - startTime}ms):`, {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    
    // Retourne directement la réponse data pour traitement dans les composants
    // La structure attendue est maintenant connue: un tableau avec un objet contenant une propriété output
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erreur Axios lors de l\'envoi du prompt:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    } else {
      console.error('Erreur inconnue lors de l\'envoi du prompt:', error);
    }
    throw error;
  }
};

// Nouvelle fonction pour créer un service via le chat IA
export const sendCreateServicePrompt = async (prompt: string): Promise<ChatResponse> => {
  try {
    const sessionId = ChatSession.getInstance().getSessionId();
    
    const requestData: CreateServiceRequest = {
      request: "CHAT_CREATE_SERVICE",
      prompt,
      id_session: sessionId
    };
    
    console.log('Envoi de la requête de création de service au webhook:', {
      url: API_URL,
      sessionId,
      prompt: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : '')
    });
    
    const startTime = Date.now();
    const response = await axios.post(API_URL, requestData);
    const endTime = Date.now();
    
    console.log(`Réponse reçue du webhook pour création de service (${endTime - startTime}ms):`, {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erreur Axios lors de la création de service:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    } else {
      console.error('Erreur inconnue lors de la création de service:', error);
    }
    throw error;
  }
};

// Fonction pour démarrer une nouvelle session de chat
// Variable pour tracer les appels multiples
let callCounter = 0;

export const startNewChat = (): string => {
  callCounter++;
  console.log(`startNewChat appelé ${callCounter} fois`);
  
  const oldSessionId = ChatSession.getInstance().getSessionId();
  ChatSession.getInstance().resetSession();
  const newSessionId = ChatSession.getInstance().getSessionId();
  console.log('Nouvelle session de chat créée:', {
    oldSessionId,
    newSessionId,
    callCount: callCounter
  });
  return newSessionId;
};

// Fonction pour obtenir l'ID de session actuel
export const getCurrentSessionId = (): string => {
  return ChatSession.getInstance().getSessionId();
};

export default {
  sendPrompt,
  sendCreateServicePrompt,
  startNewChat,
  getCurrentSessionId
};

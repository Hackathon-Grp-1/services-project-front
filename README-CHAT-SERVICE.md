# Chat IA pour la Création de Services

## Vue d'ensemble

Ce projet intègre un système de chat IA pour permettre aux utilisateurs de créer leurs services de manière interactive. Le chat utilise l'API webhook n8n pour traiter les requêtes et générer des réponses intelligentes.

## Fonctionnalités

### 1. Chat de Recherche de Services (existant)
- **URL**: `/need-form`
- **Type de requête**: `SEARCH_SERVICES`
- **Objectif**: Aider les utilisateurs à trouver des services adaptés à leurs besoins

### 2. Chat de Création de Services (nouveau)
- **URL**: `/create-service`
- **Type de requête**: `CHAT_CREATE_SERVICE`
- **Objectif**: Aider les prestataires à créer leur profil de service

## Structure de l'API

### Format de Requête
```json
{
  "request": "CHAT_CREATE_SERVICE",
  "prompt": "Description du service à créer",
  "id_session": "uuid-session-unique"
}
```

### Format de Réponse
```json
{
  "message": "Réponse de l'IA",
  "ready": true,
  "professionals": [
    {
      "id": 1,
      "description": "Description du professionnel"
    }
  ]
}
```

## Composants Principaux

### 1. `CreateServicePage.tsx`
- Page dédiée à la création de services
- Formulaire initial pour décrire le service
- Intégration du chat IA

### 2. `ChatBox.tsx` (modifié)
- Support de deux types de chat : `search` et `create_service`
- Gestion automatique des sessions
- Interface utilisateur responsive

### 3. `chatApi.ts` (modifié)
- Nouvelle fonction `sendCreateServicePrompt()`
- Gestion des sessions de chat
- Types TypeScript pour les requêtes et réponses

## Entité Service

L'entité `Service` dans le backend supporte les champs suivants :

```typescript
interface Service {
  serviceType: 'human_provider' | 'ai_agent';
  firstName?: string;
  lastName?: string;
  aiAgentName?: string;
  phone?: string;
  hourlyRate: number;
  professionalDescription: string;
  skillsDescription: string;
  skills: string[];
  domain: string;
  shortProfessionalDescription: string;
  shortSkillsDescription: string;
  aiModel?: string;
  aiVersion?: string;
  userId: number;
}
```

## Navigation

### Nouveaux liens ajoutés :
- **Navbar**: "Proposer un service" → `/create-service`
- **Hero Section**: Bouton "Proposer mes services" → `/create-service`

## Utilisation

### Pour les utilisateurs cherchant des services :
1. Aller sur `/need-form`
2. Décrire leur besoin
3. Interagir avec l'IA pour affiner leur demande

### Pour les prestataires proposant des services :
1. Aller sur `/create-service`
2. Décrire leurs compétences et services
3. Interagir avec l'IA pour créer leur profil

## Tests

Un script de test est disponible : `test-chat-api.js`

```bash
# Installer axios si nécessaire
npm install axios

# Exécuter les tests
node test-chat-api.js
```

## Configuration

### Variables d'environnement
- `API_URL`: URL du webhook n8n (actuellement : `https://n8n.labodolivier.com/webhook/hackathon`)

### Types de requêtes supportés
- `SEARCH_SERVICES`: Pour la recherche de services
- `CHAT_CREATE_SERVICE`: Pour la création de services

## Développement

### Ajout d'un nouveau type de chat
1. Ajouter le type dans `chatApi.ts`
2. Créer une nouvelle fonction d'envoi
3. Modifier `ChatBox.tsx` pour supporter le nouveau type
4. Créer une nouvelle page si nécessaire

### Améliorations possibles
- Intégration avec l'authentification utilisateur
- Sauvegarde automatique des conversations
- Export des profils créés
- Validation côté client des données de service 
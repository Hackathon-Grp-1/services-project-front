import React, { useState, useRef, useEffect, type ReactElement } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  IconButton, 
  CircularProgress, 
  Card, 
  CardContent, 
  CardActions 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { motion, AnimatePresence } from 'framer-motion';
import { sendPrompt, startNewChat, type ChatResponse } from '../api/chatApi';

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
  professionals?: Array<{
    id: number;
    description: string;
  }>;
}

interface ChatBoxProps {
  initialPrompt?: string;
  onClose: () => void;
  onNewConversation?: () => void;
}

// Component for displaying professional cards
const ProfessionalCard = ({ professional, onClick }: { 
  professional: { id: number; description: string }; 
  onClick?: (id: number) => void 
}) => {
  // Extract name from description (typically the first part before the comma)
  const name = professional.description.split(',')[0];
  const details = professional.description.split(',').slice(1).join(',');

  return (
    <Card 
      elevation={2}
      sx={{ 
        width: '100%',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        borderLeft: '4px solid',
        borderColor: 'primary.main', 
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          cursor: 'pointer'
        }
      }}
      component={motion.div}
      whileHover={{ scale: 1.01 }}
      onClick={() => onClick && onClick(professional.id)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PersonIcon color="primary" sx={{ mr: 1 }} />
          <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            fontFamily: 'Inter, sans-serif', 
            lineHeight: 1.5,
          }}>
            {name}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontFamily: 'Inter, sans-serif', 
            lineHeight: 1.5,
            fontSize: '0.875rem'
          }}
        >
          {details}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Contacter
        </Button>
        <Button size="small" color="secondary">
          Voir le profil
        </Button>
      </CardActions>
    </Card>
  );
};

// Utility function to format message content with proper bullet points
const formatMessageContent = (content: string): ReactElement => {
  // Helper function to detect and format multiple questions in a paragraph
  const formatMultipleQuestions = (text: string): ReactElement | null => {
    // Pattern to detect multiple questions in a paragraph
    // Look for at least 2 question marks with some text between them
    if (text.split('?').length - 1 >= 2) {
      // Extract introduction text (before the first question)
      let introText = '';
      let questionText = text;
      
      // Find the position of the first question mark
      const firstQuestionPos = text.indexOf('?');
      if (firstQuestionPos > 0) {
        // Check if there's an introduction before questions start
        const firstPart = text.substring(0, firstQuestionPos + 1).trim();
        if (firstPart.split(' ').length > 5) { // If introduction is substantial
          const parts = text.split(/\?[\s\.]+/);
          if (parts.length > 0) {
            introText = parts[0] + '?';
            questionText = text.substring(introText.length).trim();
          }
        }
      }
      
      // Split by question marks to get individual questions
      const questions = questionText.split(/\?[\s\.]+/).filter(q => q.trim().length > 0);
      
      // Convert questions to bullet points
      if (questions.length >= 1) {
        return (
          <>
            {introText && (
              <Typography paragraph margin="dense">
                {introText}
              </Typography>
            )}
            <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
              {questions.map((q, idx) => (
                <li key={`q-${idx}`}>
                  {q.trim()}{idx < questions.length - 1 || !q.trim().endsWith('?') ? ' ?' : ''}
                </li>
              ))}
            </ul>
          </>
        );
      }
    }
    return null;
  };

  // Check if content has multiple questions in a single paragraph
  const formattedQuestions = formatMultipleQuestions(content);
  if (formattedQuestions) {
    return formattedQuestions;
  }
  
  // Process for bullet points - look for patterns like "- item" or "1. item"
  const lines = content.split('\n');
  const formattedLines: ReactElement[] = [];
  
  let inBulletList = false;
  let inNumberedList = false;
  let currentList: ReactElement[] = [];
  
  // This will identify bullet patterns in the response from the API
  const bulletPattern = /^-\s+.+/;
  const numberedPattern = /^\d+\.\s+.+/;
  
  // Special handling for the specific structure in the examples
  // Looking for structured data like "request": {...} 
  const jsonPattern = /(Structure complète de la réponse|message|ready|professionals|request):/i;
  
  lines.forEach((line, index) => {
    // Check for JSON pattern to avoid formatting structured data as bullets
    if (jsonPattern.test(line)) {
      // If we were previously in a list, add it to the formatted content
      if (inBulletList || inNumberedList) {
        if (inBulletList) {
          formattedLines.push(
            <ul key={`ul-${index}`} style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
              {currentList}
            </ul>
          );
        } else {
          formattedLines.push(
            <ol key={`ol-${index}`} style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
              {currentList}
            </ol>
          );
        }
        inBulletList = false;
        inNumberedList = false;
        currentList = [];
      }
      
      // Add the JSON line without formatting
      formattedLines.push(
        <Typography key={`text-${index}`} paragraph margin="dense" component="pre" sx={{ fontFamily: 'monospace' }}>
          {line}
        </Typography>
      );
      return; // Skip to next line
    }
    
    // Check for bullet point
    if (bulletPattern.test(line.trim())) {
      if (!inBulletList || inNumberedList) {
        // Close any existing numbered list
        if (inNumberedList && currentList.length > 0) {
          formattedLines.push(
            <ol key={`ol-${index}`} style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
              {currentList}
            </ol>
          );
          currentList = [];
        }
        inBulletList = true;
        inNumberedList = false;
        if (currentList.length === 0) currentList = [];
      }
      
      currentList.push(
        <li key={`bullet-${index}`}>{line.trim().substring(2)}</li>
      );
    } 
    // Check for numbered list
    else if (numberedPattern.test(line.trim())) {
      if (!inNumberedList || inBulletList) {
        // Close any existing bullet list
        if (inBulletList && currentList.length > 0) {
          formattedLines.push(
            <ul key={`ul-${index}`} style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
              {currentList}
            </ul>
          );
          currentList = [];
        }
        inNumberedList = true;
        inBulletList = false;
        if (currentList.length === 0) currentList = [];
      }
      
      // Extract the number and the content
      const dotIndex = line.indexOf('.');
      const number = parseInt(line.substring(0, dotIndex).trim());
      const content = line.substring(dotIndex + 1).trim();
      
      currentList.push(
        <li key={`number-${index}`} value={number}>{content}</li>
      );
    } 
    // Regular text
    else {
      // If we were previously in a list, add it to the formatted content
      if (inBulletList && currentList.length > 0) {
        formattedLines.push(
          <ul key={`ul-${index}`} style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
            {currentList}
          </ul>
        );
        inBulletList = false;
        currentList = [];
      }
      else if (inNumberedList && currentList.length > 0) {
        formattedLines.push(
          <ol key={`ol-${index}`} style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
            {currentList}
          </ol>
        );
        inNumberedList = false;
        currentList = [];
      }
      
      // Add the current line if it's not empty
      if (line.trim()) {
        formattedLines.push(
          <Typography key={`text-${index}`} paragraph margin="dense">
            {line}
          </Typography>
        );
      } else if (index > 0 && index < lines.length - 1) {
        // Add empty lines as breaks between paragraphs, but not at the beginning or end
        formattedLines.push(<Box key={`break-${index}`} sx={{ height: '8px' }} />);
      }
    }
  });
  
  // Check if we need to close an open list
  if (inBulletList && currentList.length > 0) {
    formattedLines.push(
      <ul key="ul-final" style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
        {currentList}
      </ul>
    );
  } else if (inNumberedList && currentList.length > 0) {
    formattedLines.push(
      <ol key="ol-final" style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
        {currentList}
      </ol>
    );
  }
  
  return <>{formattedLines}</>;
};

const ChatBox = ({ initialPrompt, onClose, onNewConversation }: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);  // Référence pour suivre si le message initial a déjà été envoyé
  const initialPromptSent = useRef(false);
  const [activeProfessionals, setActiveProfessionals] = useState<Array<{id: number, description: string}>>([]);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<number | null>(null);

  useEffect(() => {
    console.log('ChatBox monté, initialPrompt:', initialPrompt);
    
    // Vérifie si l'initialPrompt existe et n'a pas déjà été envoyé
    if (initialPrompt && !initialPromptSent.current) {
      console.log('Envoi automatique du message initial (première fois uniquement)...');
      initialPromptSent.current = true; // Marquer comme envoyé pour éviter les doublons
      
      const initialMessage: ChatMessage = {
        content: initialPrompt,
        isUser: true,
        timestamp: new Date()
      };
      
      console.log('Ajout du message initial:', initialMessage);
      setMessages([initialMessage]);
      setIsLoading(true);
      
      sendPrompt(initialPrompt)
        .then(response => {
          console.log('Réponse reçue pour le message initial:', response);
          
          // Traitement pour le nouveau format n8n
          let messageContent = 'Je n\'ai pas pu traiter votre demande.';
          let professionals: Array<{id: number, description: string}> = [];
          
          console.log('Structure complète de la réponse:', JSON.stringify(response, null, 2));
          
          // Traitement pour le nouveau format n8n
          if (response && response.message) {
            messageContent = response.message;
            console.log('Message extrait avec succès du nouveau format n8n:', messageContent);
            
            // Si nous avons des professionnels à afficher et ready est true
            if (response.ready === true && response.professionals && Array.isArray(response.professionals) && response.professionals.length > 0) {
              professionals = response.professionals;
              setActiveProfessionals(professionals);
            }
          } 
          // Fallback pour l'ancien format
          else if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
            if (typeof response.data[0].output === 'string') {
              messageContent = response.data[0].output;
              console.log('Message extrait avec succès (ancien format string):', messageContent);
            } else if (response.data[0].output && response.data[0].output.message) {
              messageContent = response.data[0].output.message;
              console.log('Message extrait avec succès (ancien format objet):', messageContent);
            }
          }
          
          const botMessage: ChatMessage = {
            content: messageContent,
            isUser: false,
            timestamp: new Date(),
            professionals: professionals
          };
          
          console.log('Ajout de la réponse initiale du bot:', botMessage);
          setMessages(prev => [...prev, botMessage]);
        })
        .catch(error => {
          console.error('Erreur lors du message initial:', error);
          const errorMessage: ChatMessage = {
            content: 'Une erreur est survenue. Veuillez réessayer.',
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        })
        .finally(() => {
          setIsLoading(false);
          setNewMessage('');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Assurer que le scroll vers le bas se produit après le rendu
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    console.log('Messages mis à jour:', messages.length);
    
    // Nettoyage du timeout lors du démontage
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Utilisation de scrollIntoView avec bloc: 'end' pour un meilleur contrôle du scroll
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end',
        inline: 'nearest'
      });
    }
  };
  // Map pour tracker les messages déjà envoyés afin d'éviter les doublons
  const sentMessages = useRef(new Set<string>());
  
  const handleSendMessage = async () => {
    console.log('handleSendMessage appelé avec message:', newMessage);
    
    if (!newMessage.trim() || isLoading) {
      console.log('Message vide ou chargement en cours, abandon');
      return;
    }
    
    // Vérifier si c'est le message initial et s'il a déjà été traité
    if (newMessage === initialPrompt && initialPromptSent.current) {
      console.log('Ce message initial a déjà été traité, abandon pour éviter doublon');
      return;
    }
    
    // Générer une clé unique pour ce message (contenu + timestamp)
    const messageKey = `${newMessage.trim()}_${Date.now()}`;
    
    // Vérifier si ce message exact a déjà été envoyé récemment (dans les dernières secondes)
    if (sentMessages.current.has(messageKey.split('_')[0])) {
      console.log('Message identique détecté, abandon pour éviter doublon:', messageKey);
      return;
    }
    
    // Marquer ce message comme envoyé
    sentMessages.current.add(messageKey.split('_')[0]);

    const userMessage: ChatMessage = {
      content: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    console.log('Ajout du message utilisateur:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    console.log('isLoading mis à true');
    
    try {
      console.log('Envoi du prompt au webhook:', newMessage);
      const response = await sendPrompt(newMessage);
      console.log('Réponse reçue du webhook:', response);
      
      // Nouvelle structure de traitement pour le format n8n
      let messageContent = 'Je n\'ai pas pu traiter votre demande.';
      let professionals: Array<{id: number, description: string}> = [];
      
      console.log('Structure complète de la réponse:', JSON.stringify(response, null, 2));
      
      // Traitement pour le nouveau format n8n
      if (response && response.message) {
        messageContent = response.message;
        console.log('Message extrait avec succès du nouveau format n8n:', messageContent);
        
        // Si nous avons des professionnels à afficher et ready est true
        if (response.ready === true && response.professionals && Array.isArray(response.professionals) && response.professionals.length > 0) {
          professionals = response.professionals;
          setActiveProfessionals(professionals);
        } else {
          // Reset professionals if none are returned in this response
          setActiveProfessionals([]);
        }
      } 
      // Fallback pour l'ancien format
      else if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
        if (typeof response.data[0].output === 'string') {
          messageContent = response.data[0].output;
          console.log('Message extrait avec succès (ancien format string):', messageContent);
        } else if (response.data[0].output && response.data[0].output.message) {
          messageContent = response.data[0].output.message;
          console.log('Message extrait avec succès (ancien format objet):', messageContent);
        } else {
          console.warn('Format de réponse spécifique non reconnu:', response.data[0]);
        }
      } else {
        console.warn('Format de réponse inattendu:', response);
      }
      
      const botMessage: ChatMessage = {
        content: messageContent,
        isUser: false,
        timestamp: new Date(),
        professionals: professionals
      };

      console.log('Ajout de la réponse du bot:', botMessage);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        content: 'Une erreur est survenue. Veuillez réessayer.',
        isUser: false,
        timestamp: new Date()
      };

      console.log('Ajout du message d\'erreur:', errorMessage);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      console.log('Fin du traitement du message');
      setIsLoading(false);
      setNewMessage('');
    }
  };

  const handleNewConversation = () => {
    console.log('Démarrage d\'une nouvelle conversation');
    setMessages([]);
    setNewMessage('');
    setActiveProfessionals([]);
    setSelectedProfessionalId(null);
    startNewChat();
    if (onNewConversation) {
      onNewConversation();
    }
  };

  return (
    <Box 
      sx={{ 
        position: 'relative',
        bgcolor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<SendIcon />}
          onClick={handleNewConversation}
          sx={{ mr: 2 }}
        >
          Nouvelle conversation
        </Button>
        <IconButton 
          color="primary"
          onClick={onClose}
          title="Fermer"
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: 'calc(100% - 70px)', // Hauteur qui laisse de la place pour la barre de saisie
        maxHeight: 'calc(100vh - 70px)', // S'assurer qu'elle ne dépasse pas sur le footer
        scrollBehavior: 'smooth',
        bgcolor: 'background.default',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
          borderRadius: '4px'
        }
      }}>
        <Box sx={{ 
          maxWidth: '800px', 
          width: '100%', 
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}>
        <AnimatePresence mode="sync">
          {messages.map((msg, index) => (
            <React.Fragment key={`container-${msg.timestamp.getTime()}-${index}`}>
              {/* Message container */}
              <Box
                key={`msg-${msg.timestamp.getTime()}-${index}`}
                component={motion.div}
                initial={{ opacity: 0, x: msg.isUser ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                sx={{
                  width: '100%',
                  mb: msg.professionals && msg.professionals.length > 0 ? 1 : 2,
                  maxWidth: '900px',
                  display: 'flex',
                  justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                  mx: 'auto', // Center the container horizontally
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    maxWidth: '70%', // Un peu plus large
                    p: 2.5,
                    bgcolor: msg.isUser ? 'primary.main' : '#f5f5f5',
                    color: msg.isUser ? 'white' : 'text.primary',
                    borderRadius: msg.isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                    boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                    margin: msg.isUser ? '0 0.5rem 0 auto' : '0 auto 0 0.5rem', // Meilleur espacement
                    minWidth: '250px', // Largeur minimale plus grande
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {!msg.isUser && (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            mr: 1,
                            fontSize: '0.75rem'
                          }}
                        >
                          IA
                        </Box>
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 'medium',
                          opacity: 0.8,
                          mr: msg.isUser ? 0 : 1,
                          ml: msg.isUser ? 1 : 0
                        }}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                      {msg.isUser && (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: 'secondary.dark',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            ml: 1,
                            fontSize: '0.75rem'
                          }}
                        >
                          U
                        </Box>
                      )}
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        wordBreak: 'break-word',
                        textAlign: msg.isUser ? 'right' : 'left'
                      }}
                    >
                      {msg.isUser ? (
                        <Typography variant="body1" sx={{ color: 'white' }}>{msg.content}</Typography>
                      ) : (
                        formatMessageContent(msg.content)
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              {/* Professionals container - completely separate from the message */}
              {!msg.isUser && msg.professionals && msg.professionals.length > 0 && (
                <Box 
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  key={`pros-${msg.timestamp.getTime()}-${index}`}
                  sx={{ 
                    width: '100%',
                    mb: 3,
                    mt: 3,
                    maxWidth: '900px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    mx: 'auto'
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: '#f5f5f5', 
                      p: 2.5,
                      borderRadius: '20px 20px 20px 5px',
                      boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
                      maxWidth: '70%',
                      margin: '0 auto 0 0.5rem'
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        borderBottom: '2px solid',
                        borderColor: 'divider',
                        pb: 1
                      }}
                    >
                      Professionnels recommandés
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {msg.professionals.map(pro => (
                        <ProfessionalCard
                          key={`pro-${pro.id}-${index}`}
                          professional={pro}
                          onClick={(id) => {
                            console.log(`Professionnel ${id} sélectionné`);
                            setSelectedProfessionalId(id);
                            
                            // Add a message to indicate selection
                            const selectionMessage: ChatMessage = {
                              content: `Vous avez sélectionné le professionnel : ${pro.description.split(',')[0]}. Un représentant vous contactera prochainement.`,
                              isUser: false,
                              timestamp: new Date(),
                            };
                            setMessages(prev => [...prev, selectionMessage]);
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}
            </React.Fragment>
          ))}
          {isLoading && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 2,
                maxWidth: '800px',
                mx: 'auto',
                width: '100%',
                p: 3
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <CircularProgress size={24} color="primary" />
                <Typography variant="body1">
                  Je réfléchis à votre demande...
                </Typography>
              </Box>
            </Box>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
        </Box>
      </Box>

      <Box sx={{ 
        p: 1.5,
        bgcolor: 'background.paper', 
        borderTop: 1, 
        borderColor: 'divider',
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }}>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 1,
            maxWidth: '1200px',
            mx: 'auto',
            width: '100%'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tapez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Empêche le comportement par défaut de la touche Entrée
                handleSendMessage();
              }
            }}
            disabled={isLoading}
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
            sx={{ borderRadius: 3, px: 3, py: 1 }}
          >
            Envoyer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;

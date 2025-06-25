import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { sendPrompt, startNewChat, type ChatResponse } from '../api/chatApi';

interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBoxProps {
  initialPrompt?: string;
  onClose: () => void;
  onNewConversation?: () => void;
}

const ChatBox = ({ initialPrompt, onClose, onNewConversation }: ChatBoxProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);  // Référence pour suivre si le message initial a déjà été envoyé
  const initialPromptSent = useRef(false);

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
          let professionalsList = '';
          
          console.log('Structure complète de la réponse:', JSON.stringify(response, null, 2));
          
          // Traitement pour le nouveau format n8n
          if (response && response.message) {
            messageContent = response.message;
            console.log('Message extrait avec succès du nouveau format n8n:', messageContent);
            
            // Si nous avons des professionnels à afficher et ready est true
            if (response.ready === true && response.professionals && Array.isArray(response.professionals) && response.professionals.length > 0) {
              professionalsList = '\n\nVoici les professionnels trouvés:\n';
              response.professionals.forEach(pro => {
                professionalsList += `\n- ${pro.description}\n`;
              });
              messageContent += professionalsList;
              console.log('Liste des professionnels ajoutée au message:', professionalsList);
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
            timestamp: new Date()
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
      let professionalsList = '';
      
      console.log('Structure complète de la réponse:', JSON.stringify(response, null, 2));
      
      // Traitement pour le nouveau format n8n
      if (response && response.message) {
        messageContent = response.message;
        console.log('Message extrait avec succès du nouveau format n8n:', messageContent);
        
        // Si nous avons des professionnels à afficher et ready est true
        if (response.ready === true && response.professionals && Array.isArray(response.professionals) && response.professionals.length > 0) {
          professionalsList = '\n\nVoici les professionnels trouvés:\n';
          response.professionals.forEach(pro => {
            professionalsList += `\n- ${pro.description}\n`;
          });
          messageContent += professionalsList;
          console.log('Liste des professionnels ajoutée au message:', professionalsList);
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
        timestamp: new Date()
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
    startNewChat();
    if (onNewConversation) {
      onNewConversation();
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '80vh'
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ 
        p: 2, 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">Discussion avec l'IA</Typography>
        <Box>
          <IconButton 
            size="small" 
            color="inherit" 
            onClick={handleNewConversation}
            title="Nouvelle conversation"
            sx={{ mr: 1 }}
          >
            <Typography variant="button" sx={{ fontSize: '0.7rem', mr: 0.5 }}>New</Typography>
            <SendIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            color="inherit" 
            onClick={onClose}
            title="Fermer"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        maxHeight: 'calc(80vh - 120px)', // Hauteur ajustée pour tenir compte des en-têtes et zone de saisie
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.2)',
          borderRadius: '4px'
        }
      }}>
        <AnimatePresence>          {messages.map((msg, index) => (
            <Box
              key={`msg-${msg.timestamp.getTime()}-${index}`}
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              sx={{
                display: 'flex',
                justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: '75%',
                  bgcolor: msg.isUser ? 'secondary.main' : 'background.paper',
                  color: msg.isUser ? 'white' : 'text.primary',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block',
                    mt: 1,
                    textAlign: 'right',
                    opacity: 0.7
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Paper>
            </Box>
          ))}
          {isLoading && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                mb: 2
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <CircularProgress size={20} />
                <Typography variant="body2">En train de répondre...</Typography>
              </Paper>
            </Box>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
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
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              }
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
            sx={{ borderRadius: 3 }}
          >
            Envoyer
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatBox;

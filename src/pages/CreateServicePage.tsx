import { useState, useRef } from 'react';
import { Box, Button, Container, TextField, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBox from '../components/ChatBox';
import { startNewChat } from '../api/chatApi';

const CreateServicePage = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire de création de service soumis avec prompt:', inputPrompt);
    
    if (!inputPrompt.trim()) {
      setError('Veuillez décrire le service que vous souhaitez proposer');
      console.log('Erreur: prompt vide');
      return;
    }
    
    setError('');
    console.log('Initialisation du chat de création de service...');
    
    try {
      // Démarrer une nouvelle session de chat
      const sessionId = startNewChat();
      console.log('Nouvelle session de chat créée pour création de service, ID:', sessionId);
      
      // Afficher le chat
      setShowChat(true);
      console.log('showChat mis à true, le chat de création de service devrait s\'afficher');
    } catch (err) {
      console.error('Error starting chat for service creation:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setShowChat(false);
    }
  };

  const handleCloseChat = () => {
    console.log('Fermeture du chat de création de service demandée');
    setShowChat(false);
    setInputPrompt('');
    setError('');
  };

  const handleNewConversation = () => {
    console.log('Nouvelle conversation de création de service demandée');
    setInputPrompt('');
    setError('');
  };
  
  return (
    <Box sx={{ py: 8, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <AnimatePresence>
          {!showChat && (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ fontFamily: "'Inter', sans-serif", mb: 2 }}
                >
                  Proposez vos services
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Décrivez vos compétences et services pour que notre IA puisse vous aider à créer votre profil de prestataire.
                </Typography>
              </Box>
              
              <Box 
                component="form" 
                ref={formRef}
                onSubmit={handleSubmit} 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <TextField
                  multiline
                  rows={8}
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Ex: Je suis développeur web freelance avec 5 ans d'expérience. Je maîtrise React, Node.js et MongoDB. Je propose des services de développement d'applications web, maintenance et optimisation de sites existants. Mon taux horaire est de 75€..."
                  fullWidth
                  variant="outlined"
                  error={!!error}
                  helperText={error}
                  sx={{ mb: 4 }}
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                >
                  Créer mon service avec l'IA
                </Button>
              </Box>
            </motion.div>
          )}
          
          {showChat && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', height: '70vh' }}
            >
              <ChatBox 
                initialPrompt={inputPrompt} 
                onClose={handleCloseChat}
                onNewConversation={handleNewConversation}
                chatType="create_service"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default CreateServicePage; 
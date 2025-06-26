import { SmartToy as SmartToyIcon } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { startNewChat } from '../api/chatApi';
import ChatBox from '../components/ChatBox';
import { useServiceStore } from '../store/serviceStore';

const CreateServicePage = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    setPrompt,
    setServicePaths,
    isLoading,
    setIsLoading
  } = useServiceStore();

  // Détecter le système d'exploitation
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
    if (isCmdOrCtrl && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire de création de service soumis avec prompt:', inputPrompt);

    if (!inputPrompt.trim()) {
      setError('Veuillez décrire le service que vous souhaitez proposer');
      console.log('Erreur: prompt vide');
      return;
    }

    setError('');
    setIsLoading(true);
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
    finally {
      setIsLoading(false);
      console.log('Chargement désactivé');
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
    <Box sx={{
      py: showChat ? 0 : 8,
      minHeight: showChat ? 'auto' : '100vh',
      height: 'auto',
      bgcolor: 'background.default',
      display: 'block',
      position: 'relative',
      marginBottom: 0
    }}>
      <Container
        maxWidth={showChat ? false : "md"}
        disableGutters={showChat}
        sx={{
          display: 'block',
          height: 'auto',
          pb: showChat ? 0 : 'inherit' // Supprime le padding bottom quand le chat est affiché
        }}>
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
                onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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
                  disabled={isLoading}
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                >
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} sx={{ mr: 2, color: 'white' }} />
                      Génération en cours...
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SmartToyIcon sx={{ mr: 1 }} />
                      Créer mon service avec l&apos;IA
                      <Box
                        component="span"
                        sx={{
                          ml: 1,
                          fontSize: '0.875rem',
                          opacity: 0.8,
                          fontFamily: 'monospace'
                        }}
                      >
                        ({isMac ? '⌘' : 'Ctrl'}+↵)
                      </Box>
                    </Box>
                  )}
                </Button>
              </Box>
            </motion.div>
          )}
          {showChat && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                height: 'calc(100vh - 70px)', // Hauteur réduite pour ne pas déborder sur le footer
                display: 'block',
                marginBottom: '20px' // Marge en bas pour éviter de toucher le footer
              }}
            >
              {/* Rendu du ChatBox */}
              {(() => { console.log('Rendu du ChatBox avec initialPrompt:', inputPrompt); return null; })()}
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
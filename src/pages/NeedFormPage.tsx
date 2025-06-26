import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Alert, Box, Button, CircularProgress, Container, Snackbar, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { startNewChat } from '../api/chatApi';
import ChatBox from '../components/ChatBox';
import { useAuth } from '../contexts/AuthContext';
import { useServiceStore } from '../store/serviceStore';

const NeedFormPage = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [error, setError] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(() => {
    if (window.history.state && window.history.state.usr && window.history.state.usr.justLoggedIn) {
      return true;
    }
    return false;
  });
  const [authToast, setAuthToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    setPrompt,
    setServicePaths,
    isLoading,
    setIsLoading
  } = useServiceStore();

  const { isLoggedIn } = useAuth();

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
    if (!isLoggedIn) {
      navigate('/login', { state: { mustAuth: true } });
      return;
    }
    console.log('Formulaire soumis avec prompt:', inputPrompt);

    if (!inputPrompt.trim()) {
      setError('Veuillez décrire votre besoin');
      console.log('Erreur: prompt vide');
      return;
    }

    setError('');
    setIsLoading(true);
    console.log('Chargement activé, initialisation du chat...');

    try {
      // Démarrer une nouvelle session de chat
      const sessionId = startNewChat();
      console.log('Nouvelle session de chat créée, ID:', sessionId);

      // Store the prompt in global state
      setPrompt(inputPrompt);
      console.log('Prompt stocké dans le state global');

      // Afficher le chat
      setShowChat(true);
      console.log('showChat mis à true, le chat devrait s\'afficher');

      // On n'utilise plus le mock API et la navigation directe vers service-paths
      // mais on garde le code commenté au cas où on en aurait besoin plus tard
      /*
      // Call the mock API
      const paths = await fetchServicePaths(inputPrompt);
      
      // Store the service paths in global state
      setServicePaths(paths);
      
      // Navigate to the service paths page
      navigate('/service-paths');
      */
    } catch (err) {
      console.error('Error starting chat:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setShowChat(false);
    } finally {
      setIsLoading(false);
      console.log('Chargement désactivé');
    }
  };

  const handleCloseChat = () => {
    console.log('Fermeture du chat demandée');
    setShowChat(false);
    setInputPrompt('');
    setError('');
  };

  const handleNewConversation = () => {
    console.log('Nouvelle conversation demandée');
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
      <Snackbar open={loginSuccess} autoHideDuration={2000} onClose={() => setLoginSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Connexion réussie !
        </Alert>
      </Snackbar>
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
                  Décrivez votre besoin
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Partagez les détails de votre projet pour que notre IA puisse vous proposer les meilleurs parcours de services.
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
                  placeholder="Ex: Je souhaite créer un site e-commerce pour vendre mes produits artisanaux avec une boutique en ligne, un système de paiement sécurisé et une gestion des stocks..."
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
                      <AutoAwesomeRoundedIcon sx={{ mr: 1 }} />
                      Envoyer mon idée de projet à l&apos;IA
                      <Box
                        component="span"
                        sx={{
                          ml: 2,
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: 'rgba(255,255,255,0.35)',
                          borderRadius: 2,
                          px: 1.5,
                          py: 0.5,
                          fontWeight: 500,
                          fontSize: '1rem',
                          gap: 0.5,
                          boxShadow: 1,
                        }}
                      >
                        {isMac
                          ? <KeyboardCommandKeyIcon sx={{ fontSize: '1.1rem' }} />
                          : <KeyboardControlKeyIcon sx={{ fontSize: '1.1rem' }} />}
                        <KeyboardReturnIcon sx={{ fontSize: '1.1rem', ml: 0.5 }} />
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default NeedFormPage;

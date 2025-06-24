import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchServicePaths } from '../api/mockApi';
import { useServiceStore } from '../store/serviceStore';

const NeedFormPage = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
    
  const { 
    setPrompt, 
    setServicePaths, 
    isLoading, 
    setIsLoading 
  } = useServiceStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputPrompt.trim()) {
      setError('Veuillez décrire votre besoin');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Store the prompt in global state
      setPrompt(inputPrompt);
      
      // Call the mock API
      const paths = await fetchServicePaths(inputPrompt);
      
      // Store the service paths in global state
      setServicePaths(paths);
      
      // Navigate to the service paths page
      navigate('/service-paths');
    } catch (err) {
      console.error('Error fetching service paths:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ py: 8, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ fontFamily: "'Orbitron', sans-serif", mb: 2 }}
          >
            Décrivez votre besoin
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Partagez les détails de votre projet pour que notre IA puisse vous proposer les meilleurs parcours de services.
          </Typography>
        </Box>
        
        <Box 
          component="form" 
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
              'Générer avec l\'IA'
            )}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NeedFormPage;

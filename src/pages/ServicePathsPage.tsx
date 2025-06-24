import { Box, Button, Container, Typography, Card, CardContent, CardActions, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useServiceStore } from '../store/serviceStore';
import type { ServicePath } from '../api/mockApi';

const ServicePathCard = ({ path, onSelect, onCustomize }: { 
  path: ServicePath; 
  onSelect: () => void; 
  onCustomize: () => void;
}) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontFamily: "'Orbitron', sans-serif" }}>
          {path.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {path.description}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="overline" color="text.secondary">Durée</Typography>
            <Typography variant="h6">{path.totalDuration} jours</Typography>
          </Box>
          <Box>
            <Typography variant="overline" color="text.secondary" align="right">Prix</Typography>
            <Typography variant="h6" align="right">{path.totalPrice} €</Typography>
          </Box>
        </Box>
        
        <Typography variant="overline" color="text.secondary">Étapes</Typography>
        <Box sx={{ mt: 1 }}>
          {path.steps.map((step) => (
            <Box key={step.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Chip 
                label={step.type === 'human' ? 'Expert' : 'IA'} 
                size="small" 
                color={step.type === 'human' ? 'primary' : 'secondary'} 
                sx={{ mr: 1, minWidth: '50px' }}
              />
              <Typography variant="body2">{step.title}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          size="small" 
          variant="outlined" 
          sx={{ mr: 1 }}
          onClick={onCustomize}
        >
          Personnaliser
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          color="secondary"
          onClick={onSelect}
        >
          Choisir ce path
        </Button>
      </CardActions>
    </Card>
  );
};

const ServicePathsPage = () => {
  const navigate = useNavigate();
  const { servicePaths, selectPath } = useServiceStore();
  
  // Redirect to home if no service paths available
  if (servicePaths.length === 0) {
    navigate('/need-form');
    return null;
  }
  
  const handleSelectPath = (path: ServicePath) => {
    selectPath(path);
    navigate('/contract');
  };
  
  const handleCustomizePath = (path: ServicePath) => {
    selectPath(path);
    navigate('/path-editor');
  };

  return (
    <Box sx={{ py: 8, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ fontFamily: "'Orbitron', sans-serif", mb: 2 }}
          >
            Parcours de services proposés
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Notre IA a généré trois propositions de parcours adaptées à vos besoins. 
            Sélectionnez celle qui vous convient le mieux ou personnalisez-la.
          </Typography>
        </Box>        <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: -2 }}>
          {servicePaths.map((path) => (
            <Box key={path.id} sx={{ width: { xs: '100%', md: '33.33%' }, padding: 2 }}>
              <ServicePathCard 
                path={path} 
                onSelect={() => handleSelectPath(path)}
                onCustomize={() => handleCustomizePath(path)}
              />
            </Box>
          ))}
        </Box>
        
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/need-form')}
            sx={{ textTransform: 'none' }}
          >
            Retour à la description du besoin
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicePathsPage;

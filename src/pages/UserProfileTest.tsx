import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { useUser } from '../contexts/useUser';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfileTest = () => {
  const user = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Vous devez être connecté pour voir cette page
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                color="secondary"
                onClick={() => navigate('/login')}
              >
                Se connecter
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Profil Utilisateur
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Informations personnelles</Typography>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, mt: 2 }}>
              <Typography><strong>Nom:</strong> {user.lastName}</Typography>
              <Typography><strong>Prénom:</strong> {user.firstName}</Typography>
              <Typography><strong>Email:</strong> {user.email}</Typography>
              <Typography><strong>Type d'utilisateur:</strong> {user.type}</Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 4 }}>Rôle</Typography>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, mt: 2 }}>
              <Typography><strong>Nom du rôle:</strong> {user.role.name}</Typography>
              <Typography><strong>Type:</strong> {user.role.type}</Typography>
              <Typography><strong>Description:</strong> {user.role.description}</Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                color="secondary"
                onClick={handleLogout}
              >
                Se déconnecter
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfileTest;

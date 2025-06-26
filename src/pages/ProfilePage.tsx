import { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Paper, CircularProgress, Button, Divider, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authHeader } from '../api/authApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  createdAt?: string;
  phoneNumber?: string;
  bio?: string;
  type?: string;
  role?: {
    id: number;
    name: string;
    type: string;
    description?: string;
  };
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/auth/profile`, { headers: authHeader() })
      .then(res => {
        setProfile(res.data);
        console.log("Profil utilisateur chargé :", res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger le profil utilisateur.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><Alert severity="error">{error}</Alert></Box>;
  }

  if (!profile) return null;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={profile.avatarUrl} sx={{ width: 90, height: 90, mb: 2, fontSize: 36 }}>
          {(profile.firstName && profile.firstName[0]) || (profile.email && profile.email[0]) || '?'}
        </Avatar>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {profile.firstName || ''} {profile.lastName || ''}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {profile.email}
        </Typography>
        <Divider sx={{ my: 2, width: '100%' }} />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 120 }}>Téléphone</Typography>
            <Typography variant="body1" fontWeight={500}>{profile.phoneNumber || <span style={{color:'#aaa'}}>Non renseigné</span>}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 120 }}>Rôle</Typography>
            <Typography variant="body1" fontWeight={500}>{profile.role?.name || <span style={{color:'#aaa'}}>Utilisateur</span>}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 120 }}>Type de compte</Typography>
            <Typography variant="body1" fontWeight={500}>{profile.type || <span style={{color:'#aaa'}}>Non renseigné</span>}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 120 }}>Description rôle</Typography>
            <Typography variant="body1" fontWeight={500}>{profile.role?.description || <span style={{color:'#aaa'}}>Aucune description</span>}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ minWidth: 120 }}>Membre depuis</Typography>
            <Typography variant="body1" fontWeight={500}>{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('fr-FR') : '-'}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={() => navigate('/dashboard')}>Retour à Mes services</Button>
          <Button variant="outlined" color="primary" onClick={() => navigate('/profile/edit')}>Modifier mon profil</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;

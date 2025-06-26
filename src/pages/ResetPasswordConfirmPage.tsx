import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmResetPassword } from '../api/resetPasswordApi';

const passwordRules = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const ResetPasswordConfirmPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = searchParams.get('token') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!password) {
      setError('Veuillez saisir un nouveau mot de passe.');
      return;
    }
    if (!passwordRules.test(password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      await confirmResetPassword(token, password);
      setSuccess('Votre mot de passe a bien été réinitialisé. Vous pouvez maintenant vous connecter.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Erreur lors de la réinitialisation. Lien invalide ou expiré.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={420} mx="auto" mt={10} p={0} mb={10}>
      <Box boxShadow={6} borderRadius={4} bgcolor="background.paper" p={4}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #7B61FF 0%, #5AC8FA 100%)',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              boxShadow: '0 4px 16px rgba(123, 97, 255, 0.15)'
            }}
          >
            <Typography variant="h4" color="white" fontWeight={700}>🔒</Typography>
          </Box>
          <Typography variant="h5" fontWeight={700} mb={1} color="primary.main">
            Réinitialiser le mot de passe
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" mb={2}>
            Saisissez votre nouveau mot de passe.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nouveau mot de passe"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            size="medium"
            autoFocus
            helperText="Au moins 8 caractères, 1 majuscule, 1 chiffre."
          />
          <TextField
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            size="medium"
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth size="large" sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Réinitialisation...' : 'Réinitialiser'}
          </Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 3 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
      </Box>
    </Box>
  );
};

export default ResetPasswordConfirmPage;

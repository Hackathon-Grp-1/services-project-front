import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { resetPassword } from '../api/resetPasswordApi';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!email) {
      setError('Veuillez saisir votre adresse email.');
      setLoading(false);
      return;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("L'adresse email n'est pas valide.");
      setLoading(false);
      return;
    }
    try {
      await resetPassword(email);
      setSuccess('Si cette adresse existe, un email de réinitialisation a été envoyé.');
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setError("Aucun compte n'est associé à cette adresse email.");
        // Suggest to register
        
      } else if (err?.message === 'Network Error') {
        setError("Erreur réseau. Veuillez réessayer.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
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
            <Typography variant="h4" color="white" fontWeight={700}>?</Typography>
          </Box>
          <Typography variant="h5" fontWeight={700} mb={1} color="primary.main">
            Mot de passe oublié ?
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" mb={2}>
            Saisissez votre adresse email pour recevoir un lien de réinitialisation.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Adresse email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            size="medium"
            autoFocus
          />
          <Button type="submit" variant="contained" color="secondary" fullWidth size="large" sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
          </Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 3 }}>{success}</Alert>}
        {error && (
          <Alert severity="error" sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>
              {error}
            </span>
            {error.toLowerCase().includes('aucun compte') && (
              <Button
                variant="text"
                color="secondary"
                href="/register"
                sx={{ ml: 2, fontWeight: 600, textDecoration: 'underline', textTransform: 'none', fontSize: '0.85rem', p: 0, minWidth: 0 }}
                size="small"
              >
                S'inscrire
              </Button>
            )}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;

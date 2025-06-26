import { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, InputAdornment, IconButton, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    role: '', // Ajout du champ rôle
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'acceptTerms' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    // Validation côté client
    const errors: { [key: string]: boolean } = {};
    if (!formData.firstName.trim()) errors.firstName = true;
    if (!formData.lastName.trim()) errors.lastName = true;
    if (!formData.email.trim()) errors.email = true;
    if (!formData.phoneNumber.trim()) errors.phoneNumber = true;
    if (!formData.password) errors.password = true;
    if (!formData.confirmPassword) errors.confirmPassword = true;
    if (!formData.role) errors.role = true; // Validation du rôle
    if (Object.keys(errors).length > 0) {
      setError('Merci de remplir tous les champs obligatoires.');
      setFieldErrors(errors);
      return;
    }
    // Email format
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      setError("L'adresse email n'est pas valide.");
      setFieldErrors({ email: true });
      return;
    }
    // Phone format (simple check)
    if (!/^\+?\d{8,}$/.test(formData.phoneNumber)) {
      setError('Le numéro de téléphone est invalide.');
      setFieldErrors({ phoneNumber: true });
      return;
    }
    // Password match
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setFieldErrors({ password: true, confirmPassword: true });
      return;
    }
    // Password strength (exemple simple)
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      setFieldErrors({ password: true });
      return;
    }
    setLoading(true);
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber || undefined, // optionnel
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
      }, 1800);
    } catch (err: any) {
      // Gestion des erreurs API
      let apiMsg = err?.response?.data?.message;
      if (Array.isArray(apiMsg)) apiMsg = apiMsg.join(' ');
      setError(apiMsg || 'Erreur lors de l’inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Créez votre compte
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>
          )}
          {success && (
            <Snackbar open={success} autoHideDuration={1600} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert severity="success" sx={{ width: '100%' }}>
                Inscription réussie ! Vous allez être redirigé vers la page de connexion.
              </Alert>
            </Snackbar>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                error={!!fieldErrors.firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                error={!!fieldErrors.lastName}
              />
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!fieldErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Numéro de téléphone"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!fieldErrors.phoneNumber}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!fieldErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!fieldErrors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              margin="normal"
              required
              fullWidth
              id="role"
              name="role"
              label=""
              value={formData.role}
              onChange={handleChange}
              error={!!fieldErrors.role}
              SelectProps={{ native: true }}
              sx={{ mt: 2 }}
            >
              <option value="" disabled>Choisissez votre profil *</option>
              <option value="ENTREPRENEUR">Entrepreneur</option>
              <option value="CUSTOMER">Client</option>
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTerms"
                  color="secondary"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
              }
              label="J'accepte les conditions générales d'utilisation et la politique de confidentialité"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formData.acceptTerms || loading}
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                Vous avez déjà un compte ?{' '}
                <Button
                  component={RouterLink}
                  to="/login"
                  color="secondary"
                  sx={{ textTransform: 'none' }}
                >
                  Se connecter
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;

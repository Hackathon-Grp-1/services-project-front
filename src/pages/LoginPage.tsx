import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { login, loading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setFieldErrors({});
    let errors: { [key: string]: boolean } = {};
    if (!email) {
      errors.email = true;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errors.email = true;
      setLocalError("L'adresse email n'est pas valide.");
    }
    if (!password) {
      errors.password = true;
    } else if (password.length < 8) {
      errors.password = true;
      setLocalError("Le mot de passe doit contenir au moins 8 caractères.");
    }
    if (Object.keys(errors).length > 0) {
      if (!localError)
        setLocalError("Veuillez saisir votre email et votre mot de passe");
      setFieldErrors(errors);
      return;
    }
    try {
      await login({ email, password });
      navigate("/need-form", { state: { justLoggedIn: true } });
    } catch (error: any) {
      setFieldErrors({ email: true, password: true });
      setLocalError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{ mb: 4 }}
          >
            Connectez-vous
          </Typography>
          {location.state?.registered && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Inscription réussie ! Vous pouvez maintenant vous connecter.
            </Alert>
          )}
          {location.state?.emailValidated && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {location.state.message ||
                "Votre compte a été validé avec succès ! Vous pouvez maintenant vous connecter."}
            </Alert>
          )}
          {location.state?.mustAuth && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Vous devez être connecté pour accéder à cette fonctionnalité.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!fieldErrors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            />{" "}
            {(localError ?? authError) && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {localError ?? authError}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Se connecter"
              )}
            </Button>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Vous n'avez pas de compte ?{" "}
                <Button
                  component={RouterLink}
                  to="/register"
                  color="secondary"
                  sx={{ textTransform: "none" }}
                >
                  S'inscrire
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;

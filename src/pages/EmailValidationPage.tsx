import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateAccount } from "../api/authApi";

const EmailValidationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError(
          "Token de validation manquant. Veuillez vérifier le lien reçu par email."
        );
        setLoading(false);
        return;
      }

      try {
        await validateAccount(token);
        // Redirect to login with success message
        navigate("/login", {
          state: {
            emailValidated: true,
            message:
              "Votre compte a été validé avec succès ! Vous pouvez maintenant vous connecter.",
          },
        });
      } catch (error: any) {
        console.error("Validation error:", error);
        setError(
          error.response?.data?.message ||
            "Erreur lors de la validation du compte. Le lien peut être expiré ou invalide."
        );
        setLoading(false);
      }
    };

    validateEmail();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 2, textAlign: "center" }}
          >
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              Validation de votre compte en cours...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Veuillez patienter pendant que nous validons votre adresse email.
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

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
            Validation du compte
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            {error
              ? "Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre support ou essayer de vous inscrire à nouveau."
              : "Votre compte a été validé avec succès !"}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmailValidationPage;

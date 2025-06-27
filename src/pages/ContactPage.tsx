import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { submitContactForm, type ContactFormData } from "../api/contactApi";

interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formValues, setFormValues] =
    useState<ContactFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<Partial<ContactFormValues>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    // Clear error when user types
    if (formErrors[name as keyof ContactFormValues]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormValues> = {};
    let isValid = true;

    if (!formValues.firstName.trim()) {
      errors.firstName = "Le prénom est requis";
      isValid = false;
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = "Le nom est requis";
      isValid = false;
    }

    if (!formValues.email.trim()) {
      errors.email = "L'email est requis";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
    ) {
      errors.email = "Adresse email invalide";
      isValid = false;
    }

    if (!formValues.subject.trim()) {
      errors.subject = "Le sujet est requis";
      isValid = false;
    }

    if (!formValues.message.trim()) {
      errors.message = "Le message est requis";
      isValid = false;
    } else if (formValues.message.length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await submitContactForm(formValues);
        console.log("API Response:", response); // Debug log

        // Ensure we have a valid response structure
        const isSuccess = response && response.success === true;

        if (isSuccess) {
          setFormValues(initialFormValues);
          setSnackbarMessage(
            "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
          );
          setSnackbarSeverity("success");
        } else {
          setSnackbarMessage(
            response?.message || "Erreur lors de la soumission du formulaire."
          );
          setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
      } catch (error: any) {
        console.log("API Error:", error); // Debug log
        setSnackbarMessage(
          error.message || "Erreur lors de la connexion au serveur."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: 700,
              backgroundImage:
                "linear-gradient(135deg, #7B61FF 0%, #5AC8FA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contactez-nous
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            fontFamily={"'Inter', sans-serif"}
            sx={{ maxWidth: 800, mx: "auto" }}
          >
            Besoin d'aide ou d'informations ? N'hésitez pas à nous contacter,
            notre équipe est à votre disposition.
          </Typography>
        </Box>{" "}
        {/* Main contact section - Form and Contact info side by side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Contact Form */}
          <Box sx={{ flex: { md: 7 }, width: "100%" }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                height: "100%",
                background:
                  "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(245,247,250,1) 100%)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 3,
                    bgcolor: "primary.main",
                    borderRadius: 1.5,
                  },
                }}
              >
                Envoyez-nous un message
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {/* Nom et prénom sur la même ligne */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 3,
                    }}
                  >
                    {" "}
                    <TextField
                      fullWidth
                      label="Prénom"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleInputChange}
                      error={!!formErrors.firstName}
                      helperText={formErrors.firstName}
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                        },
                      }}
                    />{" "}
                    <TextField
                      fullWidth
                      label="Nom"
                      name="lastName"
                      value={formValues.lastName}
                      onChange={handleInputChange}
                      error={!!formErrors.lastName}
                      helperText={formErrors.lastName}
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                        },
                      }}
                    />
                  </Box>
                  {/* Email et téléphone sur la même ligne */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 3,
                    }}
                  >
                    {" "}
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      required
                      variant="outlined"
                      disabled={isSubmitting}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                        },
                      }}
                    />{" "}
                    <TextField
                      fullWidth
                      label="Téléphone (optionnel)"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                      disabled={isSubmitting}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                        },
                      }}
                    />
                  </Box>
                  {/* Sujet sur une ligne complète */}{" "}
                  <TextField
                    fullWidth
                    label="Sujet"
                    name="subject"
                    value={formValues.subject}
                    onChange={handleInputChange}
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                    required
                    variant="outlined"
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                  {/* Message avec zone de texte plus grande */}{" "}
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formValues.message}
                    onChange={handleInputChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    required
                    variant="outlined"
                    disabled={isSubmitting}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "flex-end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    fullWidth={isMobile}
                    disabled={isSubmitting}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: "0 4px 14px 0 rgba(123, 97, 255, 0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 20px 0 rgba(123, 97, 255, 0.4)",
                      },
                    }}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  </Button>
                </Box>
              </Box>
            </Paper>{" "}
          </Box>

          {/* Contact Info */}
          <Box sx={{ flex: { md: 5 }, width: "100%" }}>
            <Box sx={{ height: "100%" }}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 2,
                  height: "100%",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(250, 250, 255, 1) 100%)",
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Nos coordonnées
                </Typography>

                <Card
                  sx={{
                    mb: 3,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }}
                  elevation={2}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      "&:last-child": { pb: 3 },
                    }}
                  >
                    <EmailIcon color="primary" fontSize="large" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        contact@services-marketplace.com
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    mb: 3,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }}
                  elevation={2}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      "&:last-child": { pb: 3 },
                    }}
                  >
                    <PhoneIcon color="primary" fontSize="large" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Téléphone
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +33 (0)1 23 45 67 89
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    mb: 3,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }}
                  elevation={2}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      "&:last-child": { pb: 3 },
                    }}
                  >
                    <LocationOnIcon color="primary" fontSize="large" />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        Adresse
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        123 Avenue des Services
                        <br />
                        75001 Paris, France
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Horaires d'ouverture
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Lundi - Vendredi:</strong> 9h00 - 18h00
                  </Typography>
                  <Typography variant="body1">
                    <strong>Weekend:</strong> Fermé
                  </Typography>
                </Box>
              </Paper>
            </Box>{" "}
          </Box>
        </Box>
        <Divider sx={{ my: 8 }} />
        {/* FAQ Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            FAQ
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, maxWidth: 800, mx: "auto" }}
          >
            Voici quelques réponses aux questions les plus fréquemment posées
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <Card elevation={2} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Comment fonctionne votre service ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Notre plateforme met en relation les entreprises ayant des
                  besoins spécifiques avec des fournisseurs de services
                  qualifiés. Vous décrivez votre besoin, recevez des
                  propositions personnalisées, choisissez celle qui vous
                  convient, et nous sécurisons le processus de paiement et
                  d'exécution.
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={2} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Comment sont sélectionnés les prestataires ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tous les prestataires passent par un processus de vérification
                  rigoureux. Nous évaluons leurs compétences, leur expérience et
                  leur réputation avant de les accepter sur notre plateforme. De
                  plus, un système d'évaluation continue permet de maintenir un
                  haut niveau de qualité.
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={2} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Comment fonctionne le système de paiement ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nous utilisons un système de paiement sécurisé en séquestre.
                  Cela signifie que le paiement est libéré au prestataire
                  seulement lorsque vous confirmez que le service a été
                  correctement réalisé, garantissant ainsi votre satisfaction.
                </Typography>
              </CardContent>
            </Card>

            <Card elevation={2} sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Que faire en cas de problème avec un service ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Notre service client est disponible pour résoudre tout litige.
                  Si vous n'êtes pas satisfait d'un service, contactez-nous
                  immédiatement et nous vous aiderons à trouver une solution
                  avec le prestataire ou à obtenir un remboursement si
                  nécessaire.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;

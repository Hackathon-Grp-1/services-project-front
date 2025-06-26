import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from '../contexts/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { mustAuth: true } });
    } else {
      navigate("/need-form");
    }
  };

  const handleProposeService = () => {
    navigate("/create-service");
  };

  const handleProposeService = () => {
    navigate("/create-service");
  };

  return (
    <Box
      component={motion.div}
      initial={{ background: "#1E2A38" }}
      animate={{ 
        background: [
          "#1E2A38", 
          "#232F3E",
          "#283545", 
          "#1E2A38"
        ]
      }}
      transition={{ 
        duration: 10, 
        repeat: Infinity,
        repeatType: "reverse"
      }}
      sx={{
        color: "white",
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background design elements */}
      <Box
        component={motion.div}
        animate={{ 
          x: [0, 10, -5, 0],
          y: [0, -15, 5, 0],
          scale: [1, 1.05, 0.98, 1],
          opacity: [0.7, 0.8, 0.7]
        }}
        transition={{ 
          duration: 20, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(91, 200, 250, 0.1)",
          zIndex: 0,
        }}
      />
      <Box
        component={motion.div}
        animate={{ 
          x: [0, -10, 15, 0],
          y: [0, 10, -5, 0],
          scale: [1, 0.95, 1.02, 1],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ 
          duration: 15, 
          ease: "easeInOut",
          repeat: Infinity, 
          repeatType: "reverse"
        }}
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(123, 97, 255, 0.1)",
          zIndex: 0,
        }}
      />
      
      {/* Additional floating bubbles */}
      <Box
        component={motion.div}
        animate={{ 
          x: [0, 20, -10, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ 
          duration: 18, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.03)",
          zIndex: 0,
        }}
      />
      
      <Box
        component={motion.div}
        animate={{ 
          x: [0, -15, 5, 0],
          y: [0, 5, -15, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ 
          duration: 25, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        sx={{
          position: "absolute",
          top: "50%",
          right: "15%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(91, 200, 250, 0.05)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              fontWeight: 700,
              mb: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Vous avez une idée ? On assemble l'équipe pour la concrétiser.
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.05rem", md: "1.35rem" },
              fontWeight: 400,
              my: 4,
              maxWidth: 800,
              mx: "auto",
              color: "rgba(255, 255, 255, 0.85)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Une seule plateforme. Une seule facture. Un projet complet.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleGetStarted}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1.125rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Exprimer mon besoin
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={handleProposeService}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: "1.125rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                fontFamily: "'Inter', sans-serif",
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Proposer mes services
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;

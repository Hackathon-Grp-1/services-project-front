import { Box, Container, Typography } from "@mui/material";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <HeroSection />
      
      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: "#F7F9FC" }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center"
            sx={{
              mb: 6,
              fontFamily: "'Orbitron', sans-serif",
              color: "#1E2A38",
              fontSize: { xs: "1.75rem", md: "2.5rem" }
            }}
          >
            Comment ça fonctionne
          </Typography>
          
          <Box 
            sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center",
              gap: 4
            }}
          >
            {[
              { 
                title: "Décrivez votre besoin", 
                description: "Exprimez clairement vos objectifs métiers et laissez notre IA analyser votre requête." 
              },
              { 
                title: "Parcours de services", 
                description: "Recevez trois propositions de parcours adaptés à vos besoins spécifiques." 
              },
              { 
                title: "Personnalisez", 
                description: "Affinez votre parcours en ajustant les étapes, la durée et le budget selon vos préférences." 
              },
              { 
                title: "Signez et lancez", 
                description: "Finalisez le contrat, effectuez un paiement sécurisé et suivez l'avancement de votre projet." 
              }
            ].map((feature, index) => (
              <Box 
                key={index}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "22%" },
                  p: 3,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: "50%", 
                    bgcolor: "#7B61FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    mb: 2
                  }}
                >
                  {index + 1}
                </Box>
                <Typography 
                  variant="h5"
                  sx={{ 
                    mb: 1.5, 
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#1E2A38",
                    fontWeight: 600
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#546070" }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      
      {/* Benefits Section */}
      <Box sx={{ py: 8, bgcolor: "#1E2A38" }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center"
            sx={{
              mb: 6,
              fontFamily: "'Orbitron', sans-serif",
              color: "white",
              fontSize: { xs: "1.75rem", md: "2.5rem" }
            }}
          >
            Pourquoi SMP ?
          </Typography>
          
          <Box 
            sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center",
              gap: 4
            }}
          >
            {[
              { 
                title: "Gain de temps", 
                description: "Trouvez les meilleurs prestataires rapidement grâce à l'IA qui analyse vos besoins." 
              },
              { 
                title: "Paiements sécurisés", 
                description: "Système d'escrow garantissant la sécurité des transactions jusqu'à la validation finale." 
              },
              { 
                title: "Flexibilité", 
                description: "Personnalisez chaque parcours selon vos contraintes de temps et de budget." 
              }
            ].map((benefit, index) => (
              <Box 
                key={index}
                sx={{
                  width: { xs: "100%", sm: "30%" },
                  p: 3,
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography 
                  variant="h5"
                  sx={{ 
                    mb: 1.5, 
                    fontFamily: "'Orbitron', sans-serif",
                    color: "#5AC8FA",
                    fontWeight: 600
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  {benefit.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: "#111921", color: "white" }}>
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 }
            }}
          >
            <Typography variant="body2" sx={{ fontFamily: "'Inter', sans-serif" }}>
              © 2025 Service Marketplace Platform. Tous droits réservés.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                Conditions d'utilisation
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                Confidentialité
              </Typography>
              <Typography variant="body2" sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                Mentions légales
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

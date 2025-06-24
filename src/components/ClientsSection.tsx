import { Box, Container, Typography, useTheme } from "@mui/material";

// Testimonials data
const testimonials = [
  {
    id: "testimonial-1",
    name: "Sophie Martin",
    position: "Directrice Marketing, TechVision",
    content: "Grâce à SMP, nous avons pu déployer notre campagne marketing en un temps record. L'IA a parfaitement compris nos besoins et nous a connectés aux meilleurs prestataires.",
    logoText: "TV",
  },
  {
    id: "testimonial-2",
    name: "Marc Dupont",
    position: "CEO, FinNext",
    content: "Le système de paiement sécurisé nous a donné une tranquillité d'esprit totale. La qualité des intervenants dépassait nos attentes.",
    logoText: "FN",
  },
  {
    id: "testimonial-3",
    name: "Julie Lefebvre",
    position: "Directrice de projet, InnoGroup",
    content: "La possibilité de personnaliser chaque étape du parcours est ce qui nous a convaincus. Un gain de temps considérable pour notre équipe.",
    logoText: "IG",
  },
];

// Client logos - would normally be imported images
const clientLogos = [
  { id: "logo-1", name: "TechVision", abbr: "TV" },
  { id: "logo-2", name: "FinNext", abbr: "FN" },
  { id: "logo-3", name: "InnoGroup", abbr: "IG" },
  { id: "logo-4", name: "DataCore", abbr: "DC" },
  { id: "logo-5", name: "MediaSphere", abbr: "MS" },
  { id: "logo-6", name: "GreenTech", abbr: "GT" },
];

const ClientsSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center"
          sx={{
            mb: 2,
            fontFamily: "'Orbitron', sans-serif",
            color: "#1E2A38",
            fontSize: { xs: "1.75rem", md: "2.5rem" },
            fontWeight: 600,
          }}
        >
          Nos clients nous font confiance
        </Typography>

        <Typography 
          variant="body1" 
          align="center"
          sx={{
            mb: 6,
            color: "#546070",
            maxWidth: 700,
            mx: "auto"
          }}
        >
          Des entreprises de toutes tailles utilisent notre plateforme pour trouver les meilleurs talents et services.
        </Typography>

        {/* Client logos */}
        <Box 
          sx={{ 
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mb: 8,
          }}
        >
          {clientLogos.map((logo) => (
            <Box 
              key={logo.id}
              sx={{
                width: { xs: "80px", sm: "100px", md: "130px" },
                height: { xs: "60px", sm: "70px", md: "80px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f7fa",
                borderRadius: 2,
                p: 2,
                filter: "grayscale(100%)",
                opacity: 0.8,
                transition: "all 0.3s ease",
                "&:hover": {
                  filter: "grayscale(0%)",
                  opacity: 1,
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                }
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.primary.main,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {logo.abbr}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Testimonials */}
        <Typography 
          variant="h3" 
          align="center"
          sx={{
            mb: 4,
            fontFamily: "'Orbitron', sans-serif",
            color: "#1E2A38",
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            fontWeight: 500,
          }}
        >
          Ce qu'ils en disent
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {testimonials.map((testimonial) => (
            <Box
              key={testimonial.id}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: "#f7f9fc",
                borderRadius: 2,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #7B61FF, #5AC8FA)",
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    bgcolor: theme.palette.secondary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {testimonial.logoText}
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {testimonial.position}
                  </Typography>
                </Box>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  flexGrow: 1, 
                  fontStyle: "italic",
                  position: "relative",
                  pl: 1,
                  pt: 1,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -10,
                    left: -5,
                    color: theme.palette.secondary.main,
                    fontSize: "2rem",
                    opacity: 0.2,
                  }
                }}
              >
                {testimonial.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ClientsSection;

import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: "L'IA révolutionne les services B2B : tendances 2024",
    summary: "Découvrez comment l'intelligence artificielle transforme les métiers du service et les opportunités pour les entreprises innovantes.",
    date: '12 avril 2024',
    image: '/public/illustration1.png',
  },
  {
    id: 2,
    title: "Automatisation : 5 outils pour booster votre productivité",
    summary: "Notre sélection d'outils d'automatisation pour freelances et PME, testés et approuvés par notre équipe.",
    date: '28 mars 2024',
    image: '/public/illustration2.png',
  },
  {
    id: 3,
    title: "RGPD & IA : comment rester conforme en 2024 ?",
    summary: "Les bonnes pratiques pour concilier innovation, automatisation et respect de la réglementation européenne.",
    date: '15 février 2024',
    image: '/public/illustration3.png',
  },
];

const BlogPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ mb: 6, fontWeight: 700 }}>
          Le Blog
        </Typography>
        <Grid container spacing={5}>
          {articles.map((article) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={article.id}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.02)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={article.image}
                  alt={article.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {article.date}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
                    {article.summary}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 0, p: 2, pt: 0 }}>
                  <Button variant="outlined" color="primary" fullWidth disabled>
                    Lire la suite
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default BlogPage; 
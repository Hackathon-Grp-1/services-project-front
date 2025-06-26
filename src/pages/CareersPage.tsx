import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CareersPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 2 }}>
          Rejoignez-nous
        </Typography>
        <Typography variant="h5" align="center" color="primary" sx={{ mb: 4 }}>
          Construisons ensemble l'avenir des services B2B assistés par l'IA
        </Typography>
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notre mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Chez Services Marketplace Pro, nous révolutionnons la façon dont les entreprises accèdent à des services métiers grâce à l'intelligence artificielle. Nous croyons en l'innovation, la collaboration et l'impact positif sur la société.
            </Typography>
          </CardContent>
        </Card>
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Nos valeurs
            </Typography>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li><Typography variant="body1">Innovation continue</Typography></li>
              <li><Typography variant="body1">Bienveillance & inclusion</Typography></li>
              <li><Typography variant="body1">Excellence & transparence</Typography></li>
              <li><Typography variant="body1">Équilibre vie pro/vie perso</Typography></li>
            </ul>
          </CardContent>
        </Card>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Offres à pourvoir
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Il n'y a pas encore d'offres publiées, mais nous sommes toujours à la recherche de talents passionnés !
            </Typography>
            <Button variant="contained" color="primary" size="large" href="mailto:jobs@servicesmarketplace.com">
              Candidature spontanée
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default CareersPage; 
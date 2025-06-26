import {
  Box,
  Chip,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
          Conditions d'utilisation
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            1. Acceptation des conditions
          </Typography>
          <Typography variant="body1" paragraph>
            En accédant et en utilisant la plateforme Services Marketplace Pro, vous acceptez d'être lié par ces conditions d'utilisation.
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            2. Description du service
          </Typography>
          <Typography variant="body1" paragraph>
            Services Marketplace Pro est une plateforme qui met en relation des freelances et des entreprises pour des services métiers B2B,
            avec l'assistance de l'intelligence artificielle pour optimiser les processus.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Nos services incluent :</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Mise en relation entre clients et freelances" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Services automatisés assistés par IA" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Outils de gestion de projets" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Système de paiement sécurisé" />
              </ListItem>
            </List>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            3. Compte utilisateur
          </Typography>
          <Typography variant="body1" paragraph>
            Pour utiliser certains services, vous devez créer un compte. Vous êtes responsable de :
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Maintenir la confidentialité de vos identifiants"
                secondary="Ne partagez jamais votre mot de passe avec des tiers"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Fournir des informations exactes et à jour"
                secondary="Vos informations de profil doivent être véridiques"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Notifier immédiatement toute utilisation non autorisée"
                secondary="Contactez-nous en cas de compromission de votre compte"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            4. Utilisation acceptable
          </Typography>
          <Typography variant="body1" paragraph>
            Vous vous engagez à utiliser la plateforme de manière légale et éthique.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
              ✅ Utilisations autorisées :
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Rechercher et proposer des services légitimes" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Communiquer de manière professionnelle" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Utiliser les outils de la plateforme selon leur finalité" />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'error.main' }}>
              ❌ Utilisations interdites :
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Activités illégales ou frauduleuses" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Harcèlement ou comportement abusif" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tentative de contournement des systèmes de sécurité" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Spam ou publicité non autorisée" />
              </ListItem>
            </List>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            5. Propriété intellectuelle
          </Typography>
          <Typography variant="body1" paragraph>
            La plateforme et son contenu sont protégés par les droits de propriété intellectuelle.
            Vous conservez les droits sur le contenu que vous publiez, mais accordez à Services Marketplace Pro
            une licence non exclusive pour l'utiliser dans le cadre du service.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            6. Limitation de responsabilité
          </Typography>
          <Typography variant="body1" paragraph>
            Services Marketplace Pro agit comme intermédiaire et ne peut être tenu responsable des actions
            des utilisateurs ou des résultats des services proposés. Nous nous efforçons de maintenir
            la qualité du service mais ne garantissons pas une disponibilité continue.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            7. Modifications des conditions
          </Typography>
          <Typography variant="body1" paragraph>
            Nous nous réservons le droit de modifier ces conditions à tout moment.
            Les modifications seront notifiées via la plateforme et entreront en vigueur
            dans les 30 jours suivant leur publication.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            8. Contact
          </Typography>
          <Typography variant="body1" paragraph>
            Pour toute question concernant ces conditions d'utilisation, contactez-nous à :
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="legal@servicesmarketplace.com" color="primary" />
            <Chip label="+33 1 23 45 67 89" color="secondary" />
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Ces conditions d'utilisation constituent l'accord complet entre vous et Services Marketplace Pro
            concernant l'utilisation de la plateforme.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default TermsOfServicePage; 
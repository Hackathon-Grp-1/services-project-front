import { Delete as DeleteIcon, Security as SecurityIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Chip,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
          Politique de confidentialité
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body1">
            Cette politique de confidentialité décrit comment Services Marketplace Pro collecte, utilise et protège vos informations personnelles
            conformément au Règlement Général sur la Protection des Données (RGPD).
          </Typography>
        </Alert>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            1. Responsable du traitement
          </Typography>
          <Typography variant="body1" paragraph>
            Services Marketplace Pro, société de droit français, est responsable du traitement de vos données personnelles.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>Nos coordonnées :</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Adresse : 123 Rue de l'Innovation, 75001 Paris, France"
                  secondary="Siège social"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email : privacy@servicesmarketplace.com"
                  secondary="Délégué à la protection des données"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Téléphone : +33 1 23 45 67 89"
                  secondary="Support client"
                />
              </ListItem>
            </List>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            2. Données collectées
          </Typography>
          <Typography variant="body1" paragraph>
            Nous collectons les informations suivantes pour fournir nos services :
          </Typography>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type de données</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Exemples</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Base légale</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Données d'identification</TableCell>
                  <TableCell>Nom, prénom, email, téléphone</TableCell>
                  <TableCell>Exécution du contrat</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Données de profil</TableCell>
                  <TableCell>Compétences, expérience, portfolio</TableCell>
                  <TableCell>Consentement</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Données de connexion</TableCell>
                  <TableCell>Adresse IP, logs, cookies</TableCell>
                  <TableCell>Intérêt légitime</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Données de paiement</TableCell>
                  <TableCell>Informations de facturation</TableCell>
                  <TableCell>Exécution du contrat</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            3. Finalités du traitement
          </Typography>
          <Typography variant="body1" paragraph>
            Vos données sont utilisées pour les finalités suivantes :
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Fourniture des services"
                secondary="Mise en relation, gestion des projets, paiements"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Communication"
                secondary="Support client, notifications, newsletters (avec consentement)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Amélioration des services"
                secondary="Analyses, développement de nouvelles fonctionnalités"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Sécurité"
                secondary="Prévention de la fraude, protection contre les abus"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Obligations légales"
                secondary="Facturation, comptabilité, respect des réglementations"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            4. Partage des données
          </Typography>
          <Typography variant="body1" paragraph>
            Nous ne vendons jamais vos données personnelles. Le partage est limité aux cas suivants :
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
              ✅ Partages autorisés :
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Prestataires de services"
                  secondary="Hébergement, paiement, support (avec garanties contractuelles)"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Autorités compétentes"
                  secondary="Sur demande légale ou pour protéger nos droits"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Autres utilisateurs"
                  secondary="Profil public (selon vos paramètres de confidentialité)"
                />
              </ListItem>
            </List>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            5. Conservation des données
          </Typography>
          <Typography variant="body1" paragraph>
            Nous conservons vos données uniquement le temps nécessaire aux finalités poursuivies :
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Données de compte actif"
                secondary="Durée de l'activité du compte + 3 ans"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Données de facturation"
                secondary="10 ans (obligation légale)"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Logs de connexion"
                secondary="12 mois"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Cookies"
                secondary="13 mois maximum"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            6. Vos droits
          </Typography>
          <Typography variant="body1" paragraph>
            Conformément au RGPD, vous disposez des droits suivants :
          </Typography>

          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisibilityIcon color="primary" />
              <Box>
                <Typography variant="h6">Droit d'accès</Typography>
                <Typography variant="body2">Consulter vos données personnelles</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon color="primary" />
              <Box>
                <Typography variant="h6">Droit de rectification</Typography>
                <Typography variant="body2">Corriger des données inexactes</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DeleteIcon color="primary" />
              <Box>
                <Typography variant="h6">Droit à l'effacement</Typography>
                <Typography variant="body2">Supprimer vos données</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon color="primary" />
              <Box>
                <Typography variant="h6">Droit à la portabilité</Typography>
                <Typography variant="body2">Récupérer vos données</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Pour exercer vos droits :</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip label="privacy@servicesmarketplace.com" color="primary" />
              <Chip label="Formulaire en ligne" color="secondary" />
              <Chip label="+33 1 23 45 67 89" color="info" />
            </Box>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            7. Sécurité
          </Typography>
          <Typography variant="body1" paragraph>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données :
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Chiffrement SSL/TLS"
                secondary="Protection des données en transit"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Accès restreint"
                secondary="Authentification forte et autorisations"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Sauvegardes sécurisées"
                secondary="Protection contre la perte de données"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Audits réguliers"
                secondary="Contrôle continu de la sécurité"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            8. Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez les gérer dans vos paramètres de navigateur.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            9. Modifications
          </Typography>
          <Typography variant="body1" paragraph>
            Cette politique peut être mise à jour. Les modifications importantes seront notifiées par email
            et publiées sur cette page.
          </Typography>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Pour toute question sur cette politique de confidentialité, contactez notre délégué à la protection des données.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default PrivacyPolicyPage; 
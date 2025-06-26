import { Business as BusinessIcon, Email as EmailIcon, LocationOn as LocationIcon, Phone as PhoneIcon } from '@mui/icons-material';
import {
  Box,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';

const LegalNoticePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
          Mentions légales
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            1. Éditeur du site
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <BusinessIcon color="primary" />
                <Box>
                  <Typography variant="h6">Services Marketplace Pro</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Société par actions simplifiée (SAS)
                  </Typography>
                </Box>
              </Box>

              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Capital social : 50 000 €"
                    secondary="Entièrement libéré"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="RCS Paris B 123 456 789"
                    secondary="Registre du commerce et des sociétés"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="SIRET : 123 456 789 00012"
                    secondary="Identifiant SIRET"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="TVA intracommunautaire : FR12345678901"
                    secondary="Numéro de TVA"
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LocationIcon color="primary" />
                <Box>
                  <Typography variant="h6">Adresse</Typography>
                  <Typography variant="body2">
                    123 Rue de l'Innovation<br />
                    75001 Paris, France
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="h6">Téléphone</Typography>
                  <Typography variant="body2">+33 1 23 45 67 89</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body2">contact@servicesmarketplace.com</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            2. Direction de la publication
          </Typography>
          <Typography variant="body1" paragraph>
            La direction de la publication est assurée par :
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="M. Jean Dupont"
                secondary="Président de Services Marketplace Pro"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Mme Marie Martin"
                secondary="Directrice générale"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            3. Hébergement
          </Typography>
          <Typography variant="body1" paragraph>
            Ce site est hébergé par :
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="OVH SAS"
                secondary="2 rue Kellermann, 59100 Roubaix, France"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Téléphone : +33 9 72 10 10 07"
                secondary="Support technique"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Site web : www.ovh.com"
                secondary="Informations complémentaires"
              />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            4. Propriété intellectuelle
          </Typography>
          <Typography variant="body1" paragraph>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Protection des contenus :</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Textes et contenus"
                  secondary="Tous droits réservés - Services Marketplace Pro"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Design et interface"
                  secondary="Création originale - Services Marketplace Pro"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Logos et marques"
                  secondary="Marques déposées - Services Marketplace Pro"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Code source"
                  secondary="Développement propriétaire - Services Marketplace Pro"
                />
              </ListItem>
            </List>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            5. Responsabilité
          </Typography>
          <Typography variant="body1" paragraph>
            Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour,
            mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
          </Typography>

          <Typography variant="body1" paragraph>
            Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler
            par email à l'adresse contact@servicesmarketplace.com, en décrivant le problème de la manière la plus précise possible.
          </Typography>

          <Typography variant="body1" paragraph>
            Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité.
            En conséquence, Services Marketplace Pro ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur
            de l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            6. Liens hypertextes
          </Typography>
          <Typography variant="body1" paragraph>
            Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet
            ne sauraient engager la responsabilité de Services Marketplace Pro.
          </Typography>

          <Typography variant="body1" paragraph>
            Services Marketplace Pro ne peut être tenu responsable du contenu des sites vers lesquels des liens sont établis.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            7. Cookies
          </Typography>
          <Typography variant="body1" paragraph>
            Le site peut-être amené à vous demander l'acceptation des cookies pour des besoins de statistiques et d'affichage.
            Un cookie ne nous permet pas de vous identifier ; il sert uniquement à enregistrer des informations relatives à la navigation
            de votre ordinateur sur notre site.
          </Typography>

          <Typography variant="body1" paragraph>
            Vous pouvez à tout moment désactiver ces cookies et être libre de refuser leur dépôt en prenant connaissance de notre politique de confidentialité.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            8. Droit applicable
          </Typography>
          <Typography variant="body1" paragraph>
            Tout litige en relation avec l'utilisation du site servicesmarketplace.com est soumis au droit français.
            Hormis les cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            9. Contact
          </Typography>
          <Typography variant="body1" paragraph>
            Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <Chip
              icon={<EmailIcon />}
              label="legal@servicesmarketplace.com"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<PhoneIcon />}
              label="+33 1 23 45 67 89"
              color="secondary"
              variant="outlined"
            />
            <Chip
              icon={<LocationIcon />}
              label="123 Rue de l'Innovation, 75001 Paris"
              color="info"
              variant="outlined"
            />
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Ces mentions légales sont conformes aux obligations légales françaises en vigueur.
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LegalNoticePage; 
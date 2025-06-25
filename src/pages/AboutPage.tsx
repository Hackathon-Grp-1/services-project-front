import { Box, Container, Typography, Grid, Paper, Button, useTheme, Avatar, Divider } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { ArrowForward } from '@mui/icons-material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// Compteur animé pour les stats
const AnimatedCounter = ({ value, duration = 2000, suffix = '' }: { value: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    function update() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        ref.current = setTimeout(update, 16);
      } else {
        setCount(end);
      }
    }
    update();
    return () => ref.current && clearTimeout(ref.current);
  }, [value, duration]);
  return <span>{count.toLocaleString()}<span style={{ fontSize: '1.2rem' }}>{suffix}</span></span>;
};

const AboutPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'var(--color-background)', color: 'var(--color-primary)' }}>
      {/* Hero Section */}
      <Box sx={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #7B61FF 0%, #5AC8FA 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Fade direction="up" triggerOnce>
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2, fontFamily: 'Orbitron, sans-serif' }}>
              SMP Platform : Réinventer l’externalisation B2B
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.95 }}>
              La première marketplace IA qui connecte PME et experts pour des projets métiers complets, sans friction contractuelle.
            </Typography>
            <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 3 }} href="/register">
              Rejoindre la plateforme
            </Button>
          </Container>
        </Fade>
        {/* Parallax illustration */}
        <RocketLaunchIcon sx={{
          position: 'absolute',
          right: { xs: 16, md: 64 },
          bottom: { xs: 16, md: 32 },
          fontSize: { xs: 80, md: 140 },
          opacity: 0.12,
          transform: 'rotate(-20deg)',
          pointerEvents: 'none',
        }} />
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.04)', boxShadow: 6 } }}>
              <BusinessCenterIcon color="secondary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                <AnimatedCounter value={500_000_000} duration={1800} suffix="€" />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Marché européen des services externalisés
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.04)', boxShadow: 6 } }}>
              <TrendingUpIcon color="secondary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                <AnimatedCounter value={20} duration={1800} suffix="%" />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Croissance annuelle du secteur
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.04)', boxShadow: 6 } }}>
              <GroupsIcon color="secondary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                <AnimatedCounter value={2_300_000} duration={1800} />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                PME cibles en France
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Problématique & Solution */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade direction="left" triggerOnce>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
                Les défis des PME & TPE
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: { xs: 2, md: 6 }, flexWrap: 'wrap', width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: '1 1 320px', minWidth: 260, maxWidth: 400, bgcolor: 'white', borderRadius: 3, boxShadow: 2, p: 3, m: 1 }}>
                  <BusinessCenterIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                    Découpage complexe des enjeux métiers
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Les besoins métiers sont souvent mal identifiés ou fragmentés, rendant difficile la réussite des projets.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: '1 1 320px', minWidth: 260, maxWidth: 400, bgcolor: 'white', borderRadius: 3, boxShadow: 2, p: 3, m: 1 }}>
                  <GroupsIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                    Difficulté à mobiliser les bons experts
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Trouver et engager rapidement les compétences adaptées reste un vrai casse-tête pour les dirigeants.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: '1 1 320px', minWidth: 260, maxWidth: 400, bgcolor: 'white', borderRadius: 3, boxShadow: 2, p: 3, m: 1 }}>
                  <VerifiedUserIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                    Complexité administrative & contrats multiples
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    La gestion des devis, contrats et paiements multiplie les risques et la charge mentale.
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Section 'Notre solution' supprimée */}
          </Grid>
        </Grid>
      </Container>

      {/* Différenciation */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Fade direction="up" triggerOnce>
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 4 }}>
            Pourquoi choisir SMP Platform ?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%', maxWidth: 500, bgcolor: 'white', borderRadius: 3, boxShadow: 2, p: 4, m: 1, textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { boxShadow: 6, transform: 'translateY(-6px) scale(1.03)', bgcolor: 'rgba(123,97,255,0.07)' } }}>
              <VerifiedUserIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Commission 4-8%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bien plus avantageux que les 20% des plateformes classiques (Fiverr, Malt...)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%', maxWidth: 500, bgcolor: 'white', borderRadius: 3, boxShadow: 2, p: 4, m: 1, textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { boxShadow: 6, transform: 'translateY(-6px) scale(1.03)', bgcolor: 'rgba(123,97,255,0.07)' } }}>
              <BusinessCenterIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Focus projets complets
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nous accompagnons la réussite de bout en bout, pas juste une mission isolée.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%', maxWidth: 500, bgcolor: 'white', borderRadius: 3, boxShadow: 2, p: 4, m: 1, textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { boxShadow: 6, transform: 'translateY(-6px) scale(1.03)', bgcolor: 'rgba(123,97,255,0.07)' } }}>
              <RocketLaunchIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                IA propriétaire
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Matching intelligent et automatisation grâce à nos algorithmes avancés.
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Équipe */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Fade direction="up" triggerOnce>
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 4 }}>
            L’équipe fondatrice
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: 3, textAlign: 'center', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'secondary.main', fontSize: 36, fontWeight: 700 }}>J</Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Jacques MBIADA</Typography>
                <Typography variant="body2" color="text.secondary">CEO – Expert IT/Cloud 10+ ans</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  "Notre mission : simplifier l’accès aux meilleurs talents pour chaque projet métier."
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: 3, textAlign: 'center', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'secondary.main', fontSize: 36, fontWeight: 700 }}>L</Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>Léonce YOPA</Typography>
                <Typography variant="body2" color="text.secondary">CTO – Expert blockchain & systèmes distribués</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  "L’innovation technologique au service de la performance des PME."
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      </Container>

      {/* CTA finale */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
        <Fade direction="up" triggerOnce>
          <Paper elevation={4} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, bgcolor: 'secondary.main', color: 'white', boxShadow: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Prêt à transformer vos projets métiers ?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
              Rejoignez SMP Platform et accédez à la nouvelle génération de services externalisés.
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 3 }} href="/register">
              Créer mon compte gratuitement
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default AboutPage;

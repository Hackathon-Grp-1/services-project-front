import { Box, Container, Typography, Paper, Button, Grid, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useRef, useEffect } from 'react';

const skeuoShadow = '0 6px 24px 0 rgba(60,60,60,0.18), 0 1.5px 4px 0 rgba(255,255,255,0.7) inset';
const skeuoBg = 'linear-gradient(145deg, #f9fafb 60%, #e3e6ed 100%)';
const skeuoBorder = '1.5px solid #e0e3ea';
const glassBg = 'rgba(255,255,255,0.18)';
const glassBorder = '1.5px solid rgba(255,255,255,0.35)';
const glassBlur = 'blur(18px)';
const glassShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.18)';
const glassBackdrop = {
  backdropFilter: glassBlur,
  WebkitBackdropFilter: glassBlur,
};

const PricingPage = () => {
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !gradientRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gradientRef.current.style.left = `${x}px`;
      gradientRef.current.style.top = `${y}px`;
      gradientRef.current.style.opacity = '1';
      gradientRef.current.style.visibility = 'visible';
      // Utilisation dynamique des couleurs de la charte graphique avec background plus marqué
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#1E2A38';
      const secondary = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#7B61FF';
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#5AC8FA';
      const background = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim() || '#F7F9FC';
      gradientRef.current.style.backgroundImage = `linear-gradient(135deg, ${secondary} 0%, ${accent} 35%, ${background} 70%, ${primary} 100%)`;
    };
    const handleMouseLeave = () => {
      if (!gradientRef.current) return;
      gradientRef.current.style.opacity = '0';
      gradientRef.current.style.visibility = 'hidden';
    };
    const handleMouseMoveTrail = (e: MouseEvent) => {
      if (!heroRef.current || !trailRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Crée une nouvelle tache
      const spot = document.createElement('span');
      spot.style.position = 'absolute';
      spot.style.left = `${x - 250}px`;
      spot.style.top = `${y - 250}px`;
      spot.style.width = '500px';
      spot.style.height = '500px';
      spot.style.borderRadius = '50%';
      spot.style.pointerEvents = 'none';
      spot.style.zIndex = '1';
      spot.style.opacity = '0.7';
      spot.style.filter = 'blur(60px)';
      spot.style.transition = 'opacity 0.18s cubic-bezier(0.4,0,0.2,1), left 0.12s linear, top 0.12s linear'; // transition plus rapide et fluide pour la position
      spot.style.backgroundImage = 'radial-gradient(circle at center, var(--color-secondary) 0%, var(--color-accent) 30%, rgba(90,200,250,0.18) 60%, rgba(30,42,56,0.08) 100%)';
      spot.style.mixBlendMode = 'lighten';
      trailRef.current.appendChild(spot);
      // Fade out puis suppression
      setTimeout(() => {
        spot.style.opacity = '0';
        setTimeout(() => {
          if (spot.parentNode) spot.parentNode.removeChild(spot);
        }, 180);
      }, 10);
    };
    const node = heroRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseleave', handleMouseLeave);
      node.addEventListener('mousemove', handleMouseMoveTrail);
    }
    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseleave', handleMouseLeave);
        node.removeEventListener('mousemove', handleMouseMoveTrail);
      }
    };
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'linear-gradient(135deg, #7B61FF 0%, #5AC8FA 40%, #F7B267 100%)',
      backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      color: 'var(--color-primary)',
    }}>
      {/* Hero skeuo + glass */}
      <Fade direction="down" triggerOnce cascade damping={0.15}>
        <Box ref={heroRef} sx={{
          minHeight: { xs: '70vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div ref={trailRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
          <span
            ref={gradientRef}
            className="effect-gradient pointer-events-none invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
            style={{
              position: 'absolute',
              zIndex: 1,
              width: 500,
              height: 500,
              borderRadius: '50%',
              filter: 'blur(60px)', // blur doux
              transition: 'all 60ms cubic-bezier(0.4,0,0.2,1)',
              pointerEvents: 'none',
              opacity: 0,
              visibility: 'hidden',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundImage: 'radial-gradient(circle at center, var(--color-secondary) 0%, var(--color-accent) 30%, rgba(90,200,250,0.18) 60%, rgba(30,42,56,0.08) 100%)',
              mixBlendMode: 'lighten', // effet tache lumineux
            }}
          />
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Paper elevation={0} sx={{
              bgcolor: glassBg,
              border: glassBorder,
              boxShadow: skeuoShadow,
              backdropFilter: glassBlur,
              borderRadius: 6,
              px: { xs: 2, md: 6 },
              py: { xs: 4, md: 6 },
              mx: 'auto',
              mb: 2,
              maxWidth: 700,
            }}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, fontFamily: 'Orbitron, sans-serif', textShadow: '0 2px 8px #e3e6ed' }}>
                Tarifs SMP Platform
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, textShadow: '0 1px 4px #e3e6ed' }}>
                Tarification simple, transparente et ultra-compétitive.
              </Typography>
              <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 2, fontWeight: 600, boxShadow: skeuoShadow, px: 5 }} href="/register">
                Créer mon compte gratuitement
              </Button>
            </Paper>
          </Container>
          <TrendingUpIcon sx={{
            position: 'absolute',
            right: { xs: 16, md: 64 },
            bottom: { xs: 16, md: 32 },
            fontSize: { xs: 80, md: 120 },
            opacity: 0.10,
            pointerEvents: 'none',
            zIndex: 0,
          }} />
        </Box>
      </Fade>

      {/* Comparatif Tarifs skeuo + glass */}
      <Fade direction="up" triggerOnce cascade damping={0.18}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 4, textShadow: '0 1px 4px #e3e6ed' }}>
            Pourquoi SMP est imbattable sur les tarifs ?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={5}>
              <Zoom triggerOnce>
                <Paper elevation={0} sx={{ p: 4, borderRadius: 5, textAlign: 'center', bgcolor: glassBg, boxShadow: skeuoShadow, border: glassBorder, backdropFilter: glassBlur, mb: 2 }}>
                  <VerifiedUserIcon color="secondary" sx={{ fontSize: 54, mb: 1, filter: 'drop-shadow(0 2px 8px #e3e6ed)' }} />
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Commission 4-8%</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    La plus basse du marché, sans frais cachés.
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: '#e0e3ea' }} />
                  <Typography variant="body2" color="text.secondary">
                    Paiement sécurisé via escrow, facturation automatisée, aucun coût d’inscription ou d’abonnement.
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={5}>
              <Zoom triggerOnce delay={200}>
                <Paper elevation={0} sx={{ p: 4, borderRadius: 5, textAlign: 'center', bgcolor: glassBg, boxShadow: skeuoShadow, border: glassBorder, backdropFilter: glassBlur, mb: 2 }}>
                  <BusinessCenterIcon color="secondary" sx={{ fontSize: 54, mb: 1, filter: 'drop-shadow(0 2px 8px #e3e6ed)' }} />
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Plateformes classiques</Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Commission moyenne : 20%
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: '#e0e3ea' }} />
                  <Typography variant="body2" color="text.secondary">
                    Frais cachés, gestion manuelle, peu de garanties sur la réussite du projet.
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Fade>

      {/* FAQ Tarifs skeuo + glass */}
      <Fade direction="up" triggerOnce cascade damping={0.18}>
        <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 3, textShadow: '0 1px 4px #e3e6ed' }}>
            FAQ Tarifs
          </Typography>
          <Zoom triggerOnce cascade damping={0.18}>
            <Accordion sx={{ mb: 2, boxShadow: glassShadow, borderRadius: 3, bgcolor: glassBg, border: glassBorder, ...glassBackdrop }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Y a-t-il des frais cachés ou d’abonnement ?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Non, la commission SMP (4-8%) est la seule retenue. Aucun frais d’inscription, d’abonnement ou de gestion caché.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ mb: 2, boxShadow: glassShadow, borderRadius: 3, bgcolor: glassBg, border: glassBorder, ...glassBackdrop }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Comment fonctionne le paiement sécurisé ?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Le paiement est bloqué sur un compte escrow (Stripe) et libéré uniquement à la validation du projet, pour une sécurité totale des deux parties.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ mb: 2, boxShadow: glassShadow, borderRadius: 3, bgcolor: glassBg, border: glassBorder, ...glassBackdrop }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>La commission varie-t-elle selon le projet ?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Oui, elle dépend du volume et de la nature du projet : 4% pour les gros volumes, 8% pour les missions ponctuelles. Un devis personnalisé est possible.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ mb: 2, boxShadow: glassShadow, borderRadius: 3, bgcolor: glassBg, border: glassBorder, ...glassBackdrop }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>Puis-je obtenir un devis précis avant de démarrer ?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Oui, contactez-nous pour une simulation gratuite et transparente adaptée à vos besoins.</Typography>
              </AccordionDetails>
            </Accordion>
          </Zoom>
        </Container>
      </Fade>

      {/* Estimation Tarifs */}
      <Fade direction="up" triggerOnce>
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
          <Zoom triggerOnce>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, bgcolor: glassBg, boxShadow: skeuoShadow, border: glassBorder, backdropFilter: glassBlur, mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main', textShadow: '0 1px 4px #e3e6ed' }}>
                Estimation de votre tarification SMP
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.25)', boxShadow: glassShadow, border: glassBorder, ...glassBackdrop }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>Mission ponctuelle</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', my: 1 }}>8% commission</Typography>
                    <Typography variant="body2" color="text.secondary">Pour les projets <b>inférieurs à 10 000€</b> ou missions courtes.</Typography>
                    <Divider sx={{ my: 2, borderColor: '#e0e3ea' }} />
                    <Typography variant="body2" color="text.secondary">Exemple : pour un projet de 5 000 €, la commission SMP est de 400 € (vous payez 5 400 € tout compris).</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.25)', boxShadow: glassShadow, border: glassBorder, ...glassBackdrop }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>Projet volumineux</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', my: 1 }}>4% commission</Typography>
                    <Typography variant="body2" color="text.secondary">Pour les projets <b>supérieurs à 10 000€</b> ou clients récurrents.</Typography>
                    <Divider sx={{ my: 2, borderColor: '#e0e3ea' }} />
                    <Typography variant="body2" color="text.secondary">Exemple : pour un projet de 25 000 €, la commission SMP est de 1 000 € (vous payez 26 000 € tout compris).</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Divider sx={{ my: 4, borderColor: '#e0e3ea' }} />
              <Typography variant="body2" color="text.secondary" align="center">
                Pour une estimation personnalisée, contactez-nous : <a href="mailto:contact@smp-platform.com" style={{ color: theme.palette.secondary.main, fontWeight: 600 }}>contact@smp-platform.com</a>
              </Typography>
            </Paper>
          </Zoom>
        </Container>
      </Fade>

      {/* CTA finale skeuo + glass */}
      <Fade direction="up" triggerOnce>
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Zoom triggerOnce>
            <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, borderRadius: 5, bgcolor: glassBg, color: 'primary.main', boxShadow: glassShadow, border: glassBorder, ...glassBackdrop }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textShadow: '0 1px 4px #e3e6ed' }}>
                Prêt à profiter de la tarification la plus juste ?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
                Rejoignez SMP Platform et réalisez vos projets en toute confiance.
              </Typography>
              <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: 2, fontWeight: 600, boxShadow: glassShadow, px: 5 }} href="/register">
                Créer mon compte gratuitement
              </Button>
            </Paper>
          </Zoom>
        </Container>
      </Fade>
    </Box>
  );
};

export default PricingPage;

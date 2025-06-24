import { Box, Container, Typography, Stack, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', pt: 6, pb: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '3fr 2fr 2fr 2fr' } }}>
          {/* Brand column */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{
                  background: 'linear-gradient(135deg, #7B61FF 0%, #5AC8FA 100%)',
                  color: 'white',
                  width: 42,
                  height: 42,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  fontSize: '1.4rem',
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 600,
                  boxShadow: '0 4px 8px rgba(123, 97, 255, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                S
              </Box>
              <Box>
                <Typography 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.1
                  }}
                >
                  Services
                </Typography>
                <Typography 
                  variant="caption" 
                  component="div"
                  sx={{ 
                    fontSize: '0.7rem',
                    opacity: 0.85,
                  }}
                >
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Une plateforme innovante proposant des services métiers B2B générés et assistés par IA.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Navigation
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['Accueil', 'Services', 'Comment ça marche', 'Tarifs'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link 
                    component={RouterLink} 
                    to={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    sx={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      opacity: 0.7,
                      '&:hover': { opacity: 1 },
                      fontSize: '0.9rem'
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Company */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Entreprise
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['À propos', 'Contact', 'Carrières', 'Blog'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link 
                    component={RouterLink} 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-').replace(/[éè]/g, 'e')}`}
                    sx={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      opacity: 0.7,
                      '&:hover': { opacity: 1 },
                      fontSize: '0.9rem'
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Legal */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
              Légal
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['Conditions d\'utilisation', 'Politique de confidentialité', 'Mentions légales'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link 
                    component={RouterLink} 
                    to={`/legal/${item.toLowerCase().replace(/\s+/g, '-').replace(/[éè']/g, e => e === "'" ? '' : 'e')}`}
                    sx={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      opacity: 0.7,
                      '&:hover': { opacity: 1 },
                      fontSize: '0.9rem'
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />

        <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          spacing={2}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {currentYear} Services Marketplace Pro. Tous droits réservés.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link sx={{ color: 'white', opacity: 0.6, '&:hover': { opacity: 1 } }} href="#" target="_blank">
              <Box component="span" className="sr-only">LinkedIn</Box>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </Link>
            <Link sx={{ color: 'white', opacity: 0.6, '&:hover': { opacity: 1 } }} href="#" target="_blank">
              <Box component="span" className="sr-only">Twitter/X</Box>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
              </svg>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

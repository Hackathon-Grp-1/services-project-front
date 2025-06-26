import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Box, Container, Divider, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Configuration des réseaux sociaux
  const socialNetworks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/services-marketplace',
      icon: <LinkedInIcon />,
      color: '#0077B5'
    },
    {
      name: 'Twitter/X',
      url: 'https://twitter.com/servicesmarket',
      icon: <XIcon />,
      color: '#1DA1F2'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/services-marketplace',
      icon: <GitHubIcon />,
      color: '#333'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/servicesmarketplace',
      icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24"
        style={{
          fill: '#fff'
        }}
      >
        <path d="M19.952,5.672c-1.904-1.531-4.916-1.79-5.044-1.801c-0.201-0.017-0.392,0.097-0.474,0.281 c-0.006,0.012-0.072,0.163-0.145,0.398c1.259,0.212,2.806,0.64,4.206,1.509c0.224,0.139,0.293,0.434,0.154,0.659 c-0.09,0.146-0.247,0.226-0.407,0.226c-0.086,0-0.173-0.023-0.252-0.072C15.584,5.38,12.578,5.305,12,5.305S8.415,5.38,6.011,6.872 c-0.225,0.14-0.519,0.07-0.659-0.154c-0.14-0.225-0.07-0.519,0.154-0.659c1.4-0.868,2.946-1.297,4.206-1.509 c-0.074-0.236-0.14-0.386-0.145-0.398C9.484,3.968,9.294,3.852,9.092,3.872c-0.127,0.01-3.139,0.269-5.069,1.822 C3.015,6.625,1,12.073,1,16.783c0,0.083,0.022,0.165,0.063,0.237c1.391,2.443,5.185,3.083,6.05,3.111c0.005,0,0.01,0,0.015,0 c0.153,0,0.297-0.073,0.387-0.197l0.875-1.202c-2.359-0.61-3.564-1.645-3.634-1.706c-0.198-0.175-0.217-0.477-0.042-0.675 c0.175-0.198,0.476-0.217,0.674-0.043c0.029,0.026,2.248,1.909,6.612,1.909c4.372,0,6.591-1.891,6.613-1.91 c0.198-0.172,0.5-0.154,0.674,0.045c0.174,0.198,0.155,0.499-0.042,0.673c-0.07,0.062-1.275,1.096-3.634,1.706l0.875,1.202 c0.09,0.124,0.234,0.197,0.387,0.197c0.005,0,0.01,0,0.015,0c0.865-0.027,4.659-0.667,6.05-3.111 C22.978,16.947,23,16.866,23,16.783C23,12.073,20.985,6.625,19.952,5.672z M8.891,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913s1.674,0.857,1.674,1.913S9.816,14.87,8.891,14.87z M15.109,14.87c-0.924,0-1.674-0.857-1.674-1.913 s0.749-1.913,1.674-1.913c0.924,0,1.674,0.857,1.674,1.913S16.033,14.87,15.109,14.87z"></path>
      </svg>,
      color: '#5865f2'
    },
  ];

  const companyLinks = [
    {
      name: 'À propos',
      url: '/about'
    },
    {
      name: 'Contact',
      url: '/contact'
    },
    {
      name: 'Carrières',
      url: '/careers'
    },
    {
      name: 'Blog',
      url: '/blog'
    }
  ];

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

            {/* Réseaux sociaux dans la colonne brand */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, opacity: 0.9 }}>
                Suivez-nous
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialNetworks.map((network) => (
                  <Tooltip key={network.name} title={network.name} arrow>
                    <IconButton
                      component="a"
                      href={network.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: network.color,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${network.color}40`,
                          borderColor: network.color,
                        },
                        '&:active': {
                          transform: 'translateY(0)',
                        }
                      }}
                    >
                      {network.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
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
              {companyLinks.map((item) => (
                <Box component="li" key={item.name} sx={{ mb: 1 }}>
                  <Link
                    component={RouterLink}
                    to={item.url}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      opacity: 0.7,
                      '&:hover': { opacity: 1 },
                      fontSize: '0.9rem'
                    }}
                  >
                    {item.name}
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

          {/* Réseaux sociaux en version mobile/compacte */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Stack direction="row" spacing={1}>
              {socialNetworks.slice(0, 3).map((network) => (
                <Tooltip key={network.name} title={network.name} arrow>
                  <IconButton
                    component="a"
                    href={network.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: network.color,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${network.color}40`,
                        borderColor: network.color,
                      }
                    }}
                  >
                    {network.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

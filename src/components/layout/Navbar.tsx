import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isAnchorLink, scrollToElement } from '../../utils/scrollHelper';

interface NavItemType {
  label: string;
  path: string;
  dropdown?: Array<{ label: string; path: string }>;
}

const Navbar = () => {
  const theme = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  // Solution 2 : Breakpoint custom avec navigation condensée
  const isMobile = useMediaQuery('(max-width:1236px)');
  const isCompact = useMediaQuery('(min-width:1237px) and (max-width:1300px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoutInfo, setLogoutInfo] = useState(false);

  // For dropdowns
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Navigation items - change based on authentication
  const getNavItems = (): NavItemType[] => {
    let baseItems: NavItemType[] = [
      { label: 'Accueil', path: '/' },
      {
        label: 'Trouver un service',
        path: '#',
        dropdown: [
          { label: 'Consultation', path: '/services/consultation' },
          { label: 'Développement', path: '/services/development' },
          { label: 'Design', path: '/services/design' },
          { label: 'Marketing', path: '/services/marketing' },
        ]
      },
      { label: 'Comment ça marche', path: '/#how-it-works' },
      { label: 'Tarifs', path: '/pricing' },
      { label: 'À propos', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ];

    if (isLoggedIn) {
      // Supprimer Accueil si connecté
      baseItems = baseItems.filter(item => item.label !== 'Accueil');
      // Supprimer les onglets non pertinents pour les utilisateurs connectés
      baseItems = baseItems.filter(item => !['Comment ça marche', 'Tarifs', 'À propos', 'Contact'].includes(item.label));
    }

    return baseItems;
  };

  const navItems = getNavItems();

  // Effect to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style after scrolling 100px
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const navigate = useNavigate();

  const handleMobileNavClick = (path: string, e: React.MouseEvent) => {
    if (isAnchorLink(path)) {
      e.preventDefault();
      handleDrawerToggle();

      const id = path.replace('/#', '');

      // If we're already on home page, scroll directly
      if (window.location.pathname === '/') {
        setTimeout(() => scrollToElement(id), 300);
      } else {
        // If we're on another page, navigate to home first then scroll
        navigate('/');
        setTimeout(() => scrollToElement(id), 500);
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    setLogoutInfo(true);
    navigate('/');
  } 

  // Logo component
  const Logo = ({ isScrolled }: { isScrolled: boolean }) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(135deg, #7B61FF 0%, #5AC8FA 100%)',
              color: 'white',
              width: isScrolled ? 32 : 38,
              height: isScrolled ? 32 : 38,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: isScrolled ? 1 : 1.5,
              fontSize: isScrolled ? '1rem' : '1.2rem',
              boxShadow: '0 4px 8px rgba(123, 97, 255, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            S
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: {
                  xs: isScrolled ? '1rem' : '1.2rem',
                  md: isScrolled ? '1.1rem' : '1.3rem'
                },
                transition: 'all 0.3s ease',
              }}
            >
              Services
            </Typography>
            <Typography
              variant="caption"
              component="span"
              sx={{
                fontSize: isScrolled ? '0.6rem' : '0.65rem',
                opacity: 0.85,
                letterSpacing: 0.5,
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.3s ease',
              }}
            >
            </Typography>
          </Box>
        </Typography>
      </Box>
    );
  };

  // Desktop navigation component
  const DesktopNav = () => {
    const handleNavClick = (path: string, e: React.MouseEvent) => {
      if (isAnchorLink(path)) {
        e.preventDefault();
        const id = path.replace('/#', '');

        // If we're already on home page, scroll directly
        if (window.location.pathname === '/') {
          scrollToElement(id);
        } else {
          // If we're on another page, navigate to home first then scroll
          navigate('/');
          setTimeout(() => scrollToElement(id), 300);
        }
      }
    };

    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {navItems.map((item) => (
          <Box key={item.label} sx={{ position: 'relative', mx: scrolled ? 0.75 : 1, transition: 'all 0.3s ease' }}>
            {item.dropdown ? (
              <>
                <Button
                  color="inherit"
                  onClick={(e) => handleMenuOpen(e, item.label)}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    py: scrolled ? 0.5 : 0.75,
                    px: scrolled ? 1 : 1.5,
                    fontSize: scrolled ? '0.9rem' : '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item.label}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu === item.label}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  {item.dropdown.map((dropdownItem) => (
                    <MenuItem
                      key={dropdownItem.label}
                      component={RouterLink}
                      to={dropdownItem.path}
                      onClick={handleMenuClose}
                      sx={{ minWidth: 150 }}
                    >
                      {dropdownItem.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                component={RouterLink}
                to={item.path}
                onClick={(e) => handleNavClick(item.path, e)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  py: scrolled ? 0.5 : 0.75,
                  px: scrolled ? 1 : 1.5,
                  fontSize: scrolled ? '0.9rem' : '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.label}
              </Button>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Logo isScrolled={scrolled} />
        <IconButton color="inherit" onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={RouterLink}
            to={item.dropdown ? '#' : item.path}
            onClick={(e) => item.dropdown ? null : handleMobileNavClick(item.path, e)}
          >
            <ListItemText
              primary={item.label}
              sx={{ color: theme.palette.text.primary }}
            />
          </ListItem>
        ))}
        {/* Add dropdown items in mobile as well */}
        {navItems
          .filter(item => item.dropdown)
          .flatMap(item => item.dropdown || [])
          .map(subItem => (
            <ListItem
              key={subItem.label}
              component={RouterLink}
              to={subItem.path}
              sx={{ pl: 4 }}
              onClick={handleDrawerToggle}
            >
              <ListItemText
                primary={subItem.label}
                sx={{ color: theme.palette.text.secondary }}
              />
            </ListItem>
          ))
        }
      </List>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {isLoggedIn ? (
          <>
            <Button
              variant="outlined"
              fullWidth
              component={RouterLink}
              to="/dashboard"
            >
              Mon espace
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outlined" 
              fullWidth
              component={RouterLink}
              to="/login"
            >
              Se connecter
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth
              component={RouterLink}
              to="/register"
            >
              S'inscrire
            </Button>
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: scrolled ? 'rgba(18, 18, 35, 0.85)' : 'primary.main',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Snackbar open={logoutInfo} autoHideDuration={2000} onClose={() => setLogoutInfo(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Vous avez été déconnecté.
        </Alert>
      </Snackbar>
      <Container maxWidth="xl">
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between', 
            p: { 
              xs: scrolled ? '0.5rem' : '1rem', 
              sm: scrolled ? '0.75rem 2rem' : '1rem 2rem' 
            },
            minHeight: scrolled ? { xs: '56px', md: '64px' } : { xs: '64px', md: '72px' },
            transition: 'all 0.3s ease',
          }}
        >
          <Logo isScrolled={scrolled} />
          {/* Mobile menu button */}
          {(isMobile || isCompact) && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Desktop navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Bouton spécial "Mes services" */}
              {isLoggedIn && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/dashboard"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    mr: 2,
                    boxShadow: '0 2px 8px rgba(123, 97, 255, 0.15)',
                    textTransform: 'none',
                  }}
                >
                  Mes services
                </Button>
              )}
              <DesktopNav />
              <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{ borderColor: 'white', textTransform: 'none', py: scrolled ? 0.5 : 0.75, transition: 'all 0.3s ease' }}
                      component={RouterLink}
                      to="/dashboard"
                    >
                      Mon espace
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ textTransform: 'none', py: scrolled ? 0.5 : 0.75, transition: 'all 0.3s ease' }}
                      onClick={handleLogout}
                    >
                      Se déconnecter
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outlined" 
                      color="inherit" 
                      sx={{ borderColor: 'white', textTransform: 'none', py: scrolled ? 0.5 : 0.75, transition: 'all 0.3s ease' }}
                      component={RouterLink}
                      to="/login"
                    >
                      Se connecter
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary"
                      sx={{ textTransform: 'none', py: scrolled ? 0.5 : 0.75, transition: 'all 0.3s ease' }}
                      component={RouterLink}
                      to="/register"
                    >
                      S'inscrire
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={(isMobile || isCompact) && mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

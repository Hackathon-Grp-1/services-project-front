import { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Container, 
  useMediaQuery,
  Menu,
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link as RouterLink } from 'react-router-dom';

interface NavItemType {
  label: string;
  path: string;
  dropdown?: Array<{ label: string; path: string }>;
}

const navItems: NavItemType[] = [
  { label: 'Accueil', path: '/' },
  { 
    label: 'Services', 
    path: '#',
    dropdown: [
      { label: 'Consultation', path: '/services/consultation' },
      { label: 'Développement', path: '/services/development' },
      { label: 'Design', path: '/services/design' },
      { label: 'Marketing', path: '/services/marketing' },
    ]
  },
  { label: 'Comment ça marche', path: '/how-it-works' },
  { label: 'Tarifs', path: '/pricing' },
  { label: 'À propos', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// Logo component extracted from Navbar
const Logo = () => (
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
        alignItems: 'center'
      }}
    >
      <Box 
        component="span"
        sx={{
          background: 'linear-gradient(135deg, #7B61FF 0%, #5AC8FA 100%)',
          color: 'white',
          width: 38,
          height: 38,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1.5,
          fontSize: '1.2rem',
          boxShadow: '0 4px 8px rgba(123, 97, 255, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)'
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
            fontSize: { xs: '1.2rem', md: '1.3rem' }
          }}
        >
          Services
        </Typography>
        <Typography 
          variant="caption" 
          component="span"
          sx={{ 
            fontSize: '0.65rem',
            opacity: 0.85,
            letterSpacing: 0.5,
            fontFamily: "'Inter', sans-serif",
          }}
        >
        </Typography>
      </Box>
    </Typography>
  </Box>
);

// DesktopNav component extracted from Navbar
interface DesktopNavProps {
  navItems: NavItemType[];
  openMenu: string | null;
  anchorEl: HTMLElement | null;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>, menuName: string) => void;
  handleMenuClose: () => void;
}

const DesktopNav = ({ 
  navItems, 
  openMenu, 
  anchorEl, 
  handleMenuOpen, 
  handleMenuClose 
}: DesktopNavProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {navItems.map((item) => (
      <Box key={item.label} sx={{ position: 'relative', mx: 1 }}>
        {item.dropdown ? (
          <>
            <Button
              color="inherit"
              onClick={(e) => handleMenuOpen(e, item.label)}
              endIcon={<ArrowDropDownIcon />}
              sx={{ 
                textTransform: 'none',
                fontWeight: 500
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
            sx={{ 
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            {item.label}
          </Button>
        )}
      </Box>
    ))}
  </Box>
);

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  // For dropdowns
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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
  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Logo />
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
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', p: { xs: 1, sm: 2 } }}>
          <Logo />

          {/* Mobile menu button */}
          {isMobile && (
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
              <DesktopNav 
                navItems={navItems}
                openMenu={openMenu}
                anchorEl={anchorEl}
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
              />
              <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  color="inherit" 
                  sx={{ borderColor: 'white', textTransform: 'none' }}
                  component={RouterLink}
                  to="/login"
                >
                  Se connecter
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary"
                  sx={{ textTransform: 'none' }}
                  component={RouterLink}
                  to="/register"
                >
                  S'inscrire
                </Button>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={isMobile && mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
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

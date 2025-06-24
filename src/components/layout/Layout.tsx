import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          // Add top padding to account for the fixed navbar
          // Height is different depending on screen size, so we match the navbar heights
          pt: { xs: '64px', md: '72px' }
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

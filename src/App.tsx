import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/600.css';
import '@fontsource/orbitron/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import AboutPage from './pages/AboutPage';
import AutomatedServicesPage from './pages/AutomatedServicesPage';
import ContactPage from './pages/ContactPage';
import ContractPage from './pages/ContractPage';
import CreateAutomatedServicePage from './pages/CreateAutomatedServicePage';
import CreateServicePage from './pages/CreateServicePage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import LoginPage from './pages/LoginPage';
import NeedFormPage from './pages/NeedFormPage';
import PathEditorPage from './pages/PathEditorPage';
import PricingPage from './pages/PricingPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ServicePathsPage from './pages/ServicePathsPage';
import ServicesPage from './pages/ServicesPage';

// Create MUI theme with our custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E2A38',
    },
    secondary: {
      main: '#7B61FF',
    },
    background: {
      default: '#F7F9FC',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h2: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h3: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h4: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h5: {
      fontFamily: "'Orbitron', sans-serif",
    },
    h6: {
      fontFamily: "'Orbitron', sans-serif",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter', sans-serif",
          textTransform: 'none',
        },
      },
    },
  },
});

import Layout from './components/layout/Layout';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/need-form" element={<NeedFormPage />} />
              <Route path="/service-paths" element={<ServicePathsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/consultation" element={<ServicesPage />} />
              <Route path="/services/development" element={<ServicesPage />} />
              <Route path="/services/design" element={<ServicesPage />} />
              <Route path="/services/marketing" element={<ServicesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/path-editor" element={<PathEditorPage />} />
              <Route path="/contract" element={<ContractPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/create-service" element={<CreateServicePage />} />
              <Route path="/create-automated-service" element={<CreateAutomatedServicePage />} />
              <Route path="/automated-services" element={<AutomatedServicesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App

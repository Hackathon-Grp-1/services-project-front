import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import NeedFormPage from './pages/NeedFormPage';
import ServicePathsPage from './pages/ServicePathsPage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PathEditorPage from './pages/PathEditorPage';
import ContractPage from './pages/ContractPage';
import DashboardPage from './pages/DashboardPage';
import './index.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/500.css';
import '@fontsource/orbitron/600.css';
import '@fontsource/orbitron/700.css';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App

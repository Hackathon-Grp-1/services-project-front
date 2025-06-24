import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import NeedFormPage from './pages/NeedFormPage';
import ServicePathsPage from './pages/ServicePathsPage';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/need-form" element={<NeedFormPage />} />
          <Route path="/service-paths" element={<ServicePathsPage />} />
          {/* These routes will be implemented later */}
          <Route path="/path-editor" element={<HomePage />} />
          <Route path="/contract" element={<HomePage />} />
          <Route path="/dashboard" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

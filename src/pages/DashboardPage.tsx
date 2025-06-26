import {
  Add as AddIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  SmartToy as SmartToyIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../api/servicesApi';
import ServiceCard from '../components/ServiceCard';
import { useAuth } from '../contexts/AuthContext';
import { useServices } from '../hooks/useServices';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    services,
    loading,
    error,
    total,
    page,
    limit,
    fetchServices,
    updateExistingService,
    removeService,
    clearError
  } = useServices();

  // États locaux
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Pagination
  const totalPages = Math.ceil(total / limit);

  // Gestion des filtres
  const handleSearch = () => {
    const filters: { category?: string; status?: string } = {};
    if (categoryFilter) filters.category = categoryFilter;
    if (statusFilter) filters.status = statusFilter;

    fetchServices(1, filters);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
    fetchServices(1);
  };

  // Gestion des actions sur les services
  const handleEditService = (service: Service) => {
    // TODO: Ouvrir un modal d'édition ou naviguer vers une page d'édition
    console.log('Edit service:', service);
  };

  const handleDeleteService = async (serviceId: string) => {
    setServiceToDelete(serviceId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (serviceToDelete) {
      try {
        await removeService(serviceToDelete);
        setSnackbarMessage('Service supprimé avec succès');
        setSnackbarOpen(true);
      } catch {
        setSnackbarMessage('Erreur lors de la suppression du service');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  const handleStatusChange = async (serviceId: string, status: Service['status']) => {
    try {
      await updateExistingService(serviceId, { status });
      setSnackbarMessage('Statut mis à jour avec succès');
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage('Erreur lors de la mise à jour du statut');
      setSnackbarOpen(true);
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const filters: { category?: string; status?: string } = {};
    if (categoryFilter) filters.category = categoryFilter;
    if (statusFilter) filters.status = statusFilter;

    fetchServices(value, filters);
  };

  // Navigation vers les nouvelles pages
  const handleNavigateToCreateService = () => {
    navigate('/create-service');
  };

  const handleNavigateToCreateAutomatedService = () => {
    navigate('/dashboard/create-automated-service');
  };

  const handleNavigateToAutomatedServices = () => {
    navigate('/automated-services');
  };

  return (
    <Box sx={{ py: 4, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 1,
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 600
            }}
          >
            Mes Services
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bienvenue {user?.email}, gérez vos services proposés
          </Typography>
        </Box>

        {/* Filtres et recherche */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FilterIcon sx={{ mr: 1 }} color="action" />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Filtres et recherche
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
              <TextField
                fullWidth
                label="Rechercher"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Titre, description..."
                InputProps={{
                  endAdornment: <SearchIcon color="action" />
                }}
              />
            </Box>

            <Box sx={{ minWidth: 120, flex: '0 1 120px' }}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={statusFilter}
                  label="Statut"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">Tous</MenuItem>
                  <MenuItem value="active">Actif</MenuItem>
                  <MenuItem value="inactive">Inactif</MenuItem>
                  <MenuItem value="draft">Brouillon</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 140, flex: '0 1 140px' }}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Catégorie"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="">Toutes</MenuItem>
                  <MenuItem value="Développement">Développement</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Consultation">Consultation</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flex: '0 1 auto' }}>
              <Button
                variant="contained"
                onClick={handleSearch}
              >
                Rechercher
              </Button>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
              >
                Effacer
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Affichage des erreurs */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={clearError}
          >
            {error}
          </Alert>
        )}

        {/* Section Services automatisés */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SmartToyIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Services automatisés
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
            Créez et gérez vos services automatisés pour les proposer sur notre plateforme.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleNavigateToCreateAutomatedService}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Créer un service automatisé
            </Button>

            <Button
              variant="outlined"
              startIcon={<SpeedIcon />}
              onClick={handleNavigateToAutomatedServices}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'grey.300',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Voir tous les services
            </Button>
          </Box>
        </Paper>

        {/* Liste des services */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : services.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Aucun service trouvé
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Vous n'avez pas encore créé de services ou aucun service ne correspond à vos critères de recherche.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="secondary"
              onClick={handleNavigateToCreateService}
            >
              Créer mon premier service
            </Button>
          </Paper>
        ) : (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                },
                gap: 3,
                mb: 4
              }}
            >
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={handleEditService}
                  onDelete={handleDeleteService}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}

        {/* Bouton flottant pour ajouter un service */}
        <SpeedDial
          ariaLabel="Actions rapides"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<AddIcon />}
            tooltipTitle="Créer un service"
            onClick={handleNavigateToCreateService}
          />
          <SpeedDialAction
            icon={<SmartToyIcon />}
            tooltipTitle="Créer un service automatisé"
            onClick={handleNavigateToCreateAutomatedService}
          />
          <SpeedDialAction
            icon={<SpeedIcon />}
            tooltipTitle="Voir les services automatisés"
            onClick={handleNavigateToAutomatedServices}
          />
        </SpeedDial>

        {/* Dialog de confirmation de suppression */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Supprimer le service</DialogTitle>
          <DialogContent>
            <Typography>
              Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={confirmDelete}
              color="error"
              variant="contained"
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar pour les notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
    </Box>
  );
};

export default DashboardPage;

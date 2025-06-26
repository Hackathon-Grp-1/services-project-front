import { PlayArrow as PlayIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAutomatedServices } from '../api/automatedServicesApi';
import type { AutomatedService } from '../types/automatedService';

const AutomatedServicesPage = () => {
  const [services, setServices] = useState<AutomatedService[]>([]);
  const [filteredServices, setFilteredServices] = useState<AutomatedService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getAutomatedServices();
        setServices(data);
        setFilteredServices(data);
      } catch (err) {
        setError('Erreur lors du chargement des services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    // Filtre par tarification
    if (selectedPricing) {
      filtered = filtered.filter(service => service.pricing.type === selectedPricing);
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, selectedPricing]);

  const categories = Array.from(new Set(services.map(service => service.category)));
  const pricingTypes = Array.from(new Set(services.map(service => service.pricing.type)));

  const handleServiceClick = (service: AutomatedService) => {
    // TODO: Rediriger vers une page de détail ou ouvrir un modal
    console.log('Service clicked:', service);
  };

  const formatPricing = (service: AutomatedService) => {
    switch (service.pricing.type) {
      case 'free':
        return <Chip label="Gratuit" color="success" size="small" />;
      case 'per_request':
        return (
          <Chip
            label={`${service.pricing.amount}€/requête`}
            color="primary"
            size="small"
          />
        );
      case 'subscription':
        return (
          <Chip
            label={`${service.pricing.amount}€/mois`}
            color="secondary"
            size="small"
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Chargement des services...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
          Services automatisés
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Découvrez et utilisez des services automatisés créés par nos freelances.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Filtres */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ minWidth: 300, flex: 1 }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Catégorie</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Catégorie"
              >
                <MenuItem value="">Toutes</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Tarification</InputLabel>
              <Select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                label="Tarification"
              >
                <MenuItem value="">Toutes</MenuItem>
                {pricingTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type === 'free' ? 'Gratuit' :
                      type === 'per_request' ? 'Par requête' : 'Abonnement'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} trouvé{filteredServices.length > 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Liste des services */}
        {filteredServices.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Aucun service trouvé
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Essayez de modifier vos critères de recherche
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {filteredServices.map((service, index) => (
              <Box key={service.id} sx={{ flex: '1 1 350px', maxWidth: '400px' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                        cursor: 'pointer'
                      }
                    }}
                    onClick={() => handleServiceClick(service)}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={service.provider.avatar}
                          sx={{ mr: 2, width: 40, height: 40 }}
                        >
                          {service.provider.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            {service.provider.name}
                          </Typography>
                          <Rating
                            value={service.usage.averageRating}
                            readOnly
                            size="small"
                            precision={0.1}
                          />
                        </Box>
                      </Box>

                      <Typography variant="h6" gutterBottom>
                        {service.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {service.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {service.metadata.tags.slice(0, 3).map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {service.metadata.tags.length > 3 && (
                          <Chip
                            label={`+${service.metadata.tags.length - 3}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {formatPricing(service)}
                        <Typography variant="caption" color="text.secondary">
                          {service.usage.totalRequests} utilisations
                        </Typography>
                      </Box>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ p: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<PlayIcon />}
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service);
                        }}
                      >
                        Utiliser
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default AutomatedServicesPage; 
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { createAutomatedService, testAutomatedService } from '../api/automatedServicesApi';
import type { CreateAutomatedServiceRequest } from '../types/automatedService';

const CreateAutomatedServicePage = () => {
  const [formData, setFormData] = useState<CreateAutomatedServiceRequest>({
    name: '',
    description: '',
    category: '',
    pricing: {
      type: 'free'
    },
    configuration: {
      endpoint: '',
      method: 'POST',
      headers: {},
      bodyTemplate: '',
      responseMapping: {}
    },
    metadata: {
      tags: [],
      examples: []
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [testInput, setTestInput] = useState('{"text": "Hello world"}');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfigurationChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      configuration: {
        ...prev.configuration,
        [field]: value
      }
    }));
  };

  const handlePricingChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [field]: value
      }
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.metadata.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          tags: [...prev.metadata.tags, newTag.trim()]
        }
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        tags: prev.metadata.tags.filter(tag => tag !== tagToRemove)
      }
    }));
  };

  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        examples: [
          ...prev.metadata.examples,
          {
            input: {},
            output: {},
            description: ''
          }
        ]
      }
    }));
  };

  const updateExample = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        examples: prev.metadata.examples.map((example, i) =>
          i === index ? { ...example, [field]: value } : example
        )
      }
    }));
  };

  const removeExample = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        examples: prev.metadata.examples.filter((_, i) => i !== index)
      }
    }));
  };

  const handleTest = async () => {
    try {
      setIsLoading(true);
      setError('');

      const testData = JSON.parse(testInput);
      const result = await testAutomatedService(formData.configuration, testData);

      if (result.success) {
        setTestResult(result);
      } else {
        setError(result.error || 'Test failed');
      }
    } catch (err) {
      setError('Invalid JSON input or test failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.configuration.endpoint) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await createAutomatedService(formData);
      setSuccess(true);

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        pricing: { type: 'free' },
        configuration: {
          endpoint: '',
          method: 'POST',
          headers: {},
          bodyTemplate: '',
          responseMapping: {}
        },
        metadata: {
          tags: [],
          examples: []
        }
      });

    } catch (err) {
      setError('Erreur lors de la création du service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Créer un service automatisé
        </Typography>

        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Proposez votre service automatisé sur notre plateforme et permettez aux utilisateurs de l'utiliser directement.
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Service créé avec succès ! Il sera bientôt disponible sur la plateforme.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4 }}>
            {/* Informations de base */}
            <Box sx={{ flex: '1 1 400px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Informations de base
                  </Typography>

                  <TextField
                    fullWidth
                    label="Nom du service *"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description *"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      label="Catégorie"
                    >
                      <MenuItem value="Traduction">Traduction</MenuItem>
                      <MenuItem value="Analyse de texte">Analyse de texte</MenuItem>
                      <MenuItem value="Génération d'images">Génération d'images</MenuItem>
                      <MenuItem value="Traitement de données">Traitement de données</MenuItem>
                      <MenuItem value="Autre">Autre</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Tags */}
                  <Typography variant="subtitle2" gutterBottom>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    {formData.metadata.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => removeTag(tag)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Ajouter un tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button
                      variant="outlined"
                      onClick={addTag}
                      disabled={!newTag.trim()}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Configuration technique */}
            <Box sx={{ flex: '1 1 400px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Configuration technique
                  </Typography>

                  <TextField
                    fullWidth
                    label="Endpoint URL *"
                    value={formData.configuration.endpoint}
                    onChange={(e) => handleConfigurationChange('endpoint', e.target.value)}
                    placeholder="https://api.example.com/webhook"
                    sx={{ mb: 3 }}
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Méthode HTTP</InputLabel>
                    <Select
                      value={formData.configuration.method}
                      onChange={(e) => handleConfigurationChange('method', e.target.value)}
                      label="Méthode HTTP"
                    >
                      <MenuItem value="GET">GET</MenuItem>
                      <MenuItem value="POST">POST</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Template du body (JSON)"
                    value={formData.configuration.bodyTemplate}
                    onChange={(e) => handleConfigurationChange('bodyTemplate', e.target.value)}
                    placeholder='{"prompt": "{{input.text}}"}'
                    helperText="Utilisez {{input.field}} pour référencer les données d'entrée"
                    sx={{ mb: 3 }}
                  />

                  {/* Test du service */}
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Tester le service
                  </Typography>

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Données de test (JSON)"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    variant="outlined"
                    onClick={handleTest}
                    disabled={isLoading || !formData.configuration.endpoint}
                    sx={{ mb: 2 }}
                  >
                    {isLoading ? <CircularProgress size={20} /> : 'Tester'}
                  </Button>

                  {testResult && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Résultat du test:
                      </Typography>
                      <pre style={{ fontSize: '0.875rem', overflow: 'auto' }}>
                        {JSON.stringify(testResult.result, null, 2)}
                      </pre>
                      <Typography variant="caption" color="text.secondary">
                        Temps d'exécution: {testResult.executionTime}ms
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4 }}>
            {/* Tarification */}
            <Box sx={{ flex: '1 1 400px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tarification
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Type de tarification</InputLabel>
                    <Select
                      value={formData.pricing.type}
                      onChange={(e) => handlePricingChange('type', e.target.value)}
                      label="Type de tarification"
                    >
                      <MenuItem value="free">Gratuit</MenuItem>
                      <MenuItem value="per_request">Par requête</MenuItem>
                      <MenuItem value="subscription">Abonnement</MenuItem>
                    </Select>
                  </FormControl>

                  {formData.pricing.type !== 'free' && (
                    <TextField
                      fullWidth
                      type="number"
                      label="Montant"
                      value={formData.pricing.amount || ''}
                      onChange={(e) => handlePricingChange('amount', parseFloat(e.target.value))}
                      InputProps={{
                        endAdornment: <Typography variant="caption">€</Typography>
                      }}
                      sx={{ mb: 3 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Box>

            {/* Exemples d'utilisation */}
            <Box sx={{ flex: '1 1 400px' }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Exemples d'utilisation
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={addExample}
                      startIcon={<AddIcon />}
                    >
                      Ajouter
                    </Button>
                  </Box>

                  {formData.metadata.examples.map((example, index) => (
                    <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle2">
                          Exemple {index + 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeExample(index)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <TextField
                        fullWidth
                        size="small"
                        label="Description"
                        value={example.description}
                        onChange={(e) => updateExample(index, 'description', e.target.value)}
                        sx={{ mb: 2 }}
                      />

                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          multiline
                          rows={3}
                          label="Entrée (JSON)"
                          value={JSON.stringify(example.input, null, 2)}
                          onChange={(e) => {
                            try {
                              updateExample(index, 'input', JSON.parse(e.target.value));
                            } catch {
                              // Ignore invalid JSON
                            }
                          }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          multiline
                          rows={3}
                          label="Sortie (JSON)"
                          value={JSON.stringify(example.output, null, 2)}
                          onChange={(e) => {
                            try {
                              updateExample(index, 'output', JSON.parse(e.target.value));
                            } catch {
                              // Ignore invalid JSON
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ px: 6, py: 1.5 }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} sx={{ mr: 2, color: 'white' }} />
                  Création en cours...
                </Box>
              ) : (
                'Créer le service'
              )}
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default CreateAutomatedServicePage; 
import {
  Category as CategoryIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Euro as EuroIcon,
  MoreVert as MoreVertIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import React from 'react';
import type { Service } from '../api/servicesApi';

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (serviceId: string) => void;
  onStatusChange: (serviceId: string, status: Service['status']) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status: Service['status']) => {
    onStatusChange(service.id, status);
    handleMenuClose();
  };

  const getStatusColor = (status: Service['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'draft':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: Service['status']) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'draft':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip
            label={getStatusLabel(service.status || 'active')}
            color={getStatusColor(service.status || 'active')}
            size="small"
            sx={{ fontWeight: 500 }}
          />
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ color: 'text.secondary' }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 1,
            fontWeight: 600,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {service.shortProfessionalDescription}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4
          }}
        >
          {service.professionalDescription}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4
          }}
        >
          {service.skillsDescription}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CategoryIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {service.domains?.join(', ')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EuroIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {service.hourlyRate
                ? Number(service.hourlyRate).toLocaleString('fr-FR') + ' €/h'
                : 'Tarif non renseigné'}
            </Typography>
          </Box>

          {service.duration !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {service.duration}h
              </Typography>
            </Box>
          )}
        </Box>

        {service.skills && service.skills.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Compétences :
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {service.skills.slice(0, 3).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem', height: '24px' }}
                />
              ))}
              {service.skills.length > 3 && (
                <Chip
                  label={`+${service.skills.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem', height: '24px' }}
                />
              )}
            </Box>
          </Box>
        )}

        <Typography variant="caption" color="text.secondary">
          Créé le {formatDate(service.createdAt || '')}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEdit(service)}
          sx={{ fontWeight: 500 }}
        >
          Modifier
        </Button>
        <Tooltip title="Supprimer le service">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(service.id)}
            sx={{ ml: 'auto' }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleStatusChange('active')}>
          Activer
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('inactive')}>
          Désactiver
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('draft')}>
          Mettre en brouillon
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ServiceCard; 
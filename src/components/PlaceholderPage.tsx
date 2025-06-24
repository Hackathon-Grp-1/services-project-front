import { Box, Typography, Container, Paper } from '@mui/material';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" align="center" color="text.secondary">
              {description}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PlaceholderPage;

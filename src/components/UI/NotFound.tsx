import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <FileQuestion 
          size={120} 
          color={theme.palette.primary.main} 
          opacity={0.7} 
        />
        
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mt: 4, 
            mb: 2, 
            fontWeight: 800,
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }, 
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            color: theme.palette.text.secondary 
          }}
        >
          Page Not Found
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 6, 
            maxWidth: '500px',
            color: theme.palette.text.secondary 
          }}
        >
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            startIcon={<Home size={18} />}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[4],
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s',
            }}
          >
            Go to Home
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoBack}
            startIcon={<ArrowLeft size={18} />}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
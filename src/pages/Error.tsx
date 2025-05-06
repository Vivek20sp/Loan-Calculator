import React from 'react';
import { Box, Typography, Button, Container, Paper, useTheme } from '@mui/material';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, resetErrorBoundary }) => {
  const theme = useTheme();

  const handleReload = () => {
    window.location.reload();
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
          py: 8,
          textAlign: 'center',
        }}
      >
        <AlertTriangle 
          size={80} 
          color={theme.palette.error.main} 
        />
        
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mt: 4, 
            mb: 2, 
            fontWeight: 600 
          }}
        >
          Something went wrong
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mb: 4, 
            maxWidth: '600px' 
          }}
        >
          We apologize for the inconvenience. An unexpected error has occurred in the application.
        </Typography>
        
        {error && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 4, 
              width: '100%', 
              bgcolor: 'error.light', 
              color: 'error.contrastText',
              borderRadius: 2,
              opacity: 0.9,
            }}
          >
            <Typography variant="body2" component="pre" sx={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
              {error.toString()}
              {error.stack && (
                <>
                  <br />
                  <br />
                  {error.stack}
                </>
              )}
            </Typography>
          </Paper>
        )}
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={resetErrorBoundary || handleReload}
            startIcon={<RefreshCw size={18} />}
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
            Try Again
          </Button>
          
          <Button 
            variant="outlined" 
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
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Error;
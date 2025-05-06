import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
    
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              py: 8,
              textAlign: 'center',
            }}
          >
            <AlertTriangle size={64} color="error" />
            
            <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
              We apologize for the inconvenience. An unexpected error has occurred.
            </Typography>
            
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
                {this.state.error?.toString()}
              </Typography>
            </Paper>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.handleReload}
                sx={{ borderRadius: 2 }}
              >
                Reload Page
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={this.handleGoHome}
                startIcon={<Home size={18} />}
                sx={{ borderRadius: 2 }}
              >
                Go to Home
              </Button>
            </Box>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
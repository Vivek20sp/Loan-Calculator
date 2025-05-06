import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme } from '@mui/material';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(245, 245, 245, 0.8)' 
          : 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 4 }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 2
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 600 }}>
              LoanCalc
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A comprehensive loan calculator with currency conversion
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'flex-start' },
                gap: 0.5
              }}
            >
              Made with <Heart size={14} color={theme.palette.error.main} /> in 2025
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 4 },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Resources
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 0.5 }}>
                  <Link href="#" color="text.secondary" underline="hover">Documentation</Link>
                </Box>
                <Box component="li" sx={{ mb: 0.5 }}>
                  <Link href="#" color="text.secondary" underline="hover">Financial Glossary</Link>
                </Box>
                <Box component="li" sx={{ mb: 0.5 }}>
                  <Link href="#" color="text.secondary" underline="hover">Currency Info</Link>
                </Box>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Legal
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 0.5 }}>
                  <Link href="#" color="text.secondary" underline="hover">Privacy Policy</Link>
                </Box>
                <Box component="li" sx={{ mb: 0.5 }}>
                  <Link href="#" color="text.secondary" underline="hover">Terms of Service</Link>
                </Box>
                <Box component="li" sx={{ mb: 0.5 }}>
                  <Link href="#" color="text.secondary" underline="hover">Cookie Policy</Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mt: 4 }}
        >
          © {currentYear} LoanCalc. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
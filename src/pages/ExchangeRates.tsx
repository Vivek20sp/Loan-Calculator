import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import CurrencySelector from '../components/ExchangeRates/CurrencySelector';
import RatesTable from '../components/ExchangeRates/RatesTable';

const ExchangeRates: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 2, 
            fontWeight: 700,
            background: 
              theme.palette.mode === 'light'
                ? 'linear-gradient(to right, #1976d2, #00796b)'
                : 'linear-gradient(to right, #42a5f5, #26a69a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', 
          }}
        >
          Exchange Rates & Currency Converter
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
          Convert between currencies with real-time exchange rates. Our currency database includes over 160 world currencies, updated regularly from trusted financial sources.
        </Typography>
      </Box>

      <CurrencySelector />
      <RatesTable />
    </Box>
  );
};

export default ExchangeRates;
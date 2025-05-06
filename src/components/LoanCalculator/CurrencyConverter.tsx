import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Divider,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import { Wallet, RefreshCcw } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/calculationUtils';

interface CurrencyConverterProps {
  amount: number;
  title: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ amount, title }) => {
  const theme = useTheme();
  const { 
    baseCurrency, 
    targetCurrency, 
    setTargetCurrency, 
    convertAmount,
    supportedCurrencies, 
    isLoadingRates, 
    ratesError
  } = useAppContext();

  const handleCurrencyChange = (e: SelectChangeEvent<string>) => {
    setTargetCurrency(e.target.value);
  };

  const convertedResult = convertAmount(amount);

  return (
    <Card 
      variant="outlined"
      sx={{ borderRadius: 2 }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Wallet size={20} color={theme.palette.primary.main} />
          <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {ratesError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {ratesError}
          </Alert>
        )}

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
        }}>
          <TextField
            label="From"
            value={amount.toFixed(2)}
            disabled
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{baseCurrency}</InputAdornment>
              ),
            }}
          />
          
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: { xs: 1, sm: 0 },
            }}
          >
            {isLoadingRates ? (
              <CircularProgress size={24} />
            ) : (
              <RefreshCcw size={24} color={theme.palette.text.secondary} />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="target-currency-label">To Currency</InputLabel>
              <Select
                labelId="target-currency-label"
                value={targetCurrency}
                label="To Currency"
                onChange={handleCurrencyChange}
              >
                {supportedCurrencies.slice(0).map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              label="Converted Amount"
              value={convertedResult.convertedAmount.toFixed(2)}
              disabled
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{targetCurrency}</InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          1 {baseCurrency} = {convertedResult.exchangeRate.toFixed(4)} {targetCurrency}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
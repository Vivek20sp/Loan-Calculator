import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Button,
  Divider,
  useTheme,
  SelectChangeEvent,
} from '@mui/material';
import { RefreshCw, DollarSign } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/calculationUtils';

const CurrencySelector: React.FC = () => {
  const theme = useTheme();
  const { 
    baseCurrency, 
    targetCurrency, 
    setBaseCurrency, 
    setTargetCurrency, 
    convertAmount,
    supportedCurrencies,
  } = useAppContext();

  const [amount, setAmount] = useState<number>(1000);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };

  const handleBaseCurrencyChange = (e: SelectChangeEvent<string>) => {
    setBaseCurrency(e.target.value);
  };

  const handleTargetCurrencyChange = (e: SelectChangeEvent<string>) => {
    setTargetCurrency(e.target.value);
  };

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  const convertedResult = convertAmount(amount);

  return (
    <Card elevation={1} sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DollarSign size={24} color={theme.palette.primary.main} />
          <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
            Currency Converter
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={handleAmountChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{baseCurrency}</InputAdornment>
                  ),
                }}
              />
            </Box>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="from-currency-label">From Currency</InputLabel>
              <Select
                labelId="from-currency-label"
                value={baseCurrency}
                label="From Currency"
                onChange={handleBaseCurrencyChange}
              >
                {supportedCurrencies.slice(0).map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshCw size={18} />}
                onClick={swapCurrencies}
                sx={{ borderRadius: 2 }}
              >
                Swap Currencies
              </Button>
            </Box>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="to-currency-label">To Currency</InputLabel>
              <Select
                labelId="to-currency-label"
                value={targetCurrency}
                label="To Currency"
                onChange={handleTargetCurrencyChange}
              >
                {supportedCurrencies.slice(0).map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'light' 
                  ? 'rgba(25, 118, 210, 0.05)'
                  : 'rgba(25, 118, 210, 0.15)',
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="p" sx={{ mb: 1, fontWeight: 700 }}>
                  {formatCurrency(convertedResult.convertedAmount, targetCurrency)}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Typography variant="body1">
                    {amount.toFixed(2)} {baseCurrency} equals
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  1 {baseCurrency} = {convertedResult.exchangeRate.toFixed(4)} {targetCurrency}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1 {targetCurrency} = {(1 / convertedResult.exchangeRate).toFixed(4)} {baseCurrency}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrencySelector;
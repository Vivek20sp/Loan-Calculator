import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Slider,
  Grid,
  useTheme,
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import { Calculator as CalculatorIcon, RefreshCw } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { PaymentFrequency } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/calculationUtils';
import ResultSummary from './ResultSummary';

const Calculator: React.FC = () => {
  const theme = useTheme();
  const { 
    loanParams, 
    updateLoanParams, 
    calculateEMI, 
    emiResult, 
    baseCurrency, 
    setBaseCurrency, 
    supportedCurrencies
  } = useAppContext();

  const [animateUpdate, setAnimateUpdate] = useState(false);


  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updateLoanParams({ principal: value });
    }
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updateLoanParams({ interestRate: value });
    }
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      updateLoanParams({ loanTerm: value });
    }
  };

  const handleFrequencyChange = (e: SelectChangeEvent<string>) => {
    updateLoanParams({ paymentFrequency: e.target.value as PaymentFrequency });
  };

  const handleCurrencyChange = (e: SelectChangeEvent<string>) => {
    setBaseCurrency(e.target.value);
  };

  const handlePrincipalSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      updateLoanParams({ principal: value });
    }
  };

  const handleInterestSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      updateLoanParams({ interestRate: value });
    }
  };

  const handleTermSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      updateLoanParams({ loanTerm: value });
    }
  };

  const handleCalculate = () => {
    calculateEMI();
    setAnimateUpdate(true);
    setTimeout(() => setAnimateUpdate(false), 600);
  };

  useEffect(() => {
    calculateEMI();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card 
            elevation={2}
            sx={{
              height: '100%',
              position: 'relative',
              overflow: 'visible',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -8,
                left: -8,
                right: 32,
                bottom: 8,
                backgroundColor: theme.palette.primary.main,
                opacity: 0.05,
                borderRadius: '16px',
                zIndex: -1,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CalculatorIcon size={24} color={theme.palette.primary.main} />
                <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
                  Loan Calculator
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="currency-label">Currency</InputLabel>
                <Select
                  labelId="currency-label"
                  value={baseCurrency}
                  label="Currency"
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
                label="Loan Amount"
                type="number"
                fullWidth
                value={loanParams.principal}
                onChange={handlePrincipalChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {baseCurrency}
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={loanParams.principal}
                onChange={handlePrincipalSliderChange}
                min={1000}
                max={1000000}
                step={1000}
                sx={{ mb: 3 }}
              />

              <TextField
                label="Interest Rate (%)"
                type="number"
                fullWidth
                value={loanParams.interestRate}
                onChange={handleInterestRateChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={loanParams.interestRate}
                onChange={handleInterestSliderChange}
                min={0.1}
                max={20}
                step={0.1}
                sx={{ mb: 3 }}
              />

              <TextField
                label="Loan Term (Years)"
                type="number"
                fullWidth
                value={loanParams.loanTerm}
                onChange={handleTermChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Years</InputAdornment>
                  ),
                }}
                sx={{ mb: 1 }}
              />
              <Slider
                value={loanParams.loanTerm}
                onChange={handleTermSliderChange}
                min={1}
                max={30}
                step={1}
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="frequency-label">Payment Frequency</InputLabel>
                <Select
                  labelId="frequency-label"
                  value={loanParams.paymentFrequency}
                  label="Payment Frequency"
                  onChange={handleFrequencyChange}
                >
                  <MenuItem value={PaymentFrequency.MONTHLY}>Monthly</MenuItem>
                  <MenuItem value={PaymentFrequency.QUARTERLY}>Quarterly</MenuItem>
                  <MenuItem value={PaymentFrequency.SEMI_ANNUALLY}>Semi-Annually</MenuItem>
                  <MenuItem value={PaymentFrequency.ANNUALLY}>Annually</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleCalculate}
                startIcon={<RefreshCw size={20} />}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: 2,
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
                Calculate
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <ResultSummary 
            emiResult={emiResult} 
            currency={baseCurrency} 
            animate={animateUpdate} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
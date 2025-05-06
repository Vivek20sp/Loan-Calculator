import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import Calculator from '../components/LoanCalculator/Calculator';
import AmortizationTable from '../components/LoanCalculator/AmortizationTable';

const Home: React.FC = () => {
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
          Loan Calculator with Currency Conversion
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
          Calculate your loan EMI, view the complete amortization schedule, and convert payments to different currencies using real-time exchange rates.
        </Typography>
      </Box>

      <Calculator />
      <AmortizationTable />

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mt: 4, 
          mb: 2, 
          borderRadius: 2,
          backgroundColor: 
            theme.palette.mode === 'light' 
              ? 'rgba(25, 118, 210, 0.05)' 
              : 'rgba(66, 165, 245, 0.05)',
          border: '1px solid',
          borderColor: 
            theme.palette.mode === 'light' 
              ? 'rgba(25, 118, 210, 0.1)' 
              : 'rgba(66, 165, 245, 0.1)',
        }}
      >
        <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Understanding Loan Calculation
        </Typography>
        <Typography variant="body2" paragraph>
          The Equated Monthly Installment (EMI) is calculated using the formula: 
          <strong> EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</strong>, where:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body2" paragraph>
            <strong>P</strong> = Principal loan amount
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <strong>R</strong> = Interest rate per period
          </Typography>
          <Typography component="li" variant="body2" paragraph>
            <strong>N</strong> = Total number of payments
          </Typography>
        </Box>
        <Typography variant="body2" paragraph>
          The amortization schedule shows how each payment is applied to the principal and interest over the life of the loan. The principal portion increases over time while the interest portion decreases.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
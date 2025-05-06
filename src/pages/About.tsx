import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Calculator, RefreshCw, DollarSign, BarChart, Globe, Lock, UserCheck, Smartphone } from 'lucide-react';

const About: React.FC = () => {
  const theme = useTheme();
  
  const features = [
    {
      icon: <Calculator size={24} color={theme.palette.primary.main} />,
      title: 'Loan Calculator',
      description: 'Calculate EMI, total payment, and total interest using the industry-standard formula with adjustable loan terms and interest rates.'
    },
    {
      icon: <BarChart size={24} color={theme.palette.secondary.main} />,
      title: 'Amortization Schedule',
      description: 'View a complete monthly breakdown of your loan payments, showing how each payment is split between principal and interest.'
    },
    {
      icon: <Globe size={24} color={theme.palette.info.main} />,
      title: 'Multiple Currencies',
      description: 'Support for over 160 world currencies with real-time exchange rates pulled from trusted financial sources.'
    },
    {
      icon: <RefreshCw size={24} color={theme.palette.success.main} />,
      title: 'Real-time Conversion',
      description: 'Convert your EMI and other loan details between different currencies instantly with the latest exchange rates.'
    },
    {
      icon: <Smartphone size={24} color={theme.palette.warning.main} />,
      title: 'Responsive Design',
      description: 'Fully optimized for all devices - from mobile phones to desktop computers, ensuring a seamless experience everywhere.'
    },
    {
      icon: <Lock size={24} color={theme.palette.error.main} />,
      title: 'Privacy Focused',
      description: 'All calculations are performed locally in your browser. We never store your financial information on our servers.'
    }
  ];

  return (
    <Box>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
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
          About LoanCalc
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
          A comprehensive loan calculator with currency conversion capabilities, designed to help you make informed financial decisions.
        </Typography>
      </Box>

      <Card elevation={1} sx={{ mb: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            LoanCalc was created to simplify financial planning by providing accurate loan calculations and currency conversions in one intuitive tool. Whether you're planning to take a mortgage, auto loan, or personal loan, our calculator helps you understand the true cost of borrowing and make better financial decisions.
          </Typography>
          <Typography variant="body1" paragraph>
            With our integrated currency conversion feature, we make it easy for international users and travelers to plan their finances across different currencies. By using real-time exchange rates, we ensure the most accurate calculations possible.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
            Key Features
          </Typography>
          
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box 
                  sx={{ 
                    p: 2,
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[2],
                      borderColor: 'transparent',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    {feature.icon}
                    <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
            How It Works
          </Typography>
          
          <List>
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <Calculator color={theme.palette.primary.main} />
              </ListItemIcon>
              <ListItemText
                primary="Loan Calculation"
                secondary="Enter your loan details including principal amount, interest rate, term, and payment frequency. Our calculator uses the standard EMI formula to calculate your payment schedule and total interest."
              />
            </ListItem>
            
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <BarChart color={theme.palette.primary.main} />
              </ListItemIcon>
              <ListItemText
                primary="Amortization Schedule"
                secondary="View a complete breakdown of each payment, showing how much goes toward the principal and interest. This helps you understand how your loan balance decreases over time."
              />
            </ListItem>
            
            <ListItem alignItems="flex-start">
              <ListItemIcon>
                <DollarSign color={theme.palette.primary.main} />
              </ListItemIcon>
              <ListItemText
                primary="Currency Conversion"
                secondary="Our application connects to the ExchangeRate API to fetch real-time currency conversion rates. You can convert your loan amounts between over 160 currencies to better understand the costs in your preferred currency."
              />
            </ListItem>
          </List>
          
          <Divider sx={{ my: 4 }} />
          
          
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
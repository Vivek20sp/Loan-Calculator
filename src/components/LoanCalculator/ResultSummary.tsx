import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Paper,
  useTheme,
  Fade,
} from '@mui/material';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';
import { EMIResult } from '../../types';
import { formatCurrency } from '../../utils/calculationUtils';
import CurrencyConverter from './CurrencyConverter';

interface ResultSummaryProps {
  emiResult: EMIResult;
  currency: string;
  animate: boolean;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ 
  emiResult, 
  currency,
  animate 
}) => {
  const theme = useTheme();
  const { emi, totalPayment, totalInterest, amortizationSchedule } = emiResult;

  const getIconColor = (index: number) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
    ];
    return colors[index % colors.length];
  };

  const loanCompletionDate = amortizationSchedule.length > 0
    ? amortizationSchedule[amortizationSchedule.length - 1].paymentDate
    : null;

  return (
    <Box>
      <Fade in={true} timeout={300}>
        <Card
          elevation={2}
          sx={{
            mb: 3,
            height: '100%',
            transition: 'all 0.3s ease',
            transform: animate ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CreditCard size={24} color={theme.palette.primary.main} />
              <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
                Loan Summary
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(25, 118, 210, 0.05)'
                      : 'rgba(25, 118, 210, 0.15)',
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DollarSign size={18} color={getIconColor(0)} />
                    <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
                      Payment Amount
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
                    {formatCurrency(emi, currency)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Per payment period
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(0, 121, 107, 0.05)'
                      : 'rgba(0, 121, 107, 0.15)',
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CreditCard size={18} color={getIconColor(1)} />
                    <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
                      Total Payment
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
                    {formatCurrency(totalPayment, currency)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Principal + Interest
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(255, 171, 0, 0.05)'
                      : 'rgba(255, 171, 0, 0.15)',
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingUp size={18} color={getIconColor(2)} />
                    <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
                      Total Interest
                    </Typography>
                  </Box>
                  <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
                    {formatCurrency(totalInterest, currency)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Interest cost over loan term
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(3, 169, 244, 0.05)'
                      : 'rgba(3, 169, 244, 0.15)',
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Calendar size={18} color={getIconColor(3)} />
                    <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 1 }}>
                      Loan End Date
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="p" sx={{ fontWeight: 700 }}>
                    {loanCompletionDate 
                      ? loanCompletionDate.toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                        })
                      : '-'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {amortizationSchedule.length} total payments
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <CurrencyConverter 
                amount={emi} 
                title="Payment Amount in Other Currencies" 
              />
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default ResultSummary;
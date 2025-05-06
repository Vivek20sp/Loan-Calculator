import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Skeleton,
  Alert,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import { Globe, Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/calculationUtils';

const RatesTable: React.FC = () => {
  const theme = useTheme();
  const { 
    exchangeRates, 
    baseCurrency, 
    supportedCurrencies,
    isLoadingRates, 
    ratesError 
  } = useAppContext();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const currenciesWithRates = useMemo(() => {
    if (!exchangeRates?.conversion_rates) return [];

    return Object.entries(exchangeRates.conversion_rates)
      .map(([code, rate]) => {
        const currencyInfo = supportedCurrencies.find(c => c.code === code) || { name: code };
        return {
          code,
          name: currencyInfo.name,
          rate,
        };
      })
      .filter(currency => 
        currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.code.localeCompare(b.code));
  }, [exchangeRates, supportedCurrencies, searchQuery]);

  const paginatedCurrencies = useMemo(() => {
    return currenciesWithRates.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [currenciesWithRates, page, rowsPerPage]);

  const lastUpdated = exchangeRates?.time_last_update_unix
    ? new Date(exchangeRates.time_last_update_unix * 1000).toLocaleString()
    : 'Unknown';

  return (
    <Card elevation={1}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Globe size={24} color={theme.palette.primary.main} />
          <Typography variant="h5" component="h2" sx={{ ml: 1, fontWeight: 600 }}>
            Current Exchange Rates
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Base Currency: <strong>{baseCurrency}</strong> | Last Updated: {lastUpdated}
          </Typography>
        </Box>

        {ratesError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {ratesError}
          </Alert>
        )}

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search currency by code or name..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />

        {isLoadingRates ? (
          <Box sx={{ mt: 2 }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton 
                key={index} 
                variant="rectangular" 
                height={53} 
                sx={{ my: 0.5, borderRadius: 1 }} 
              />
            ))}
          </Box>
        ) : (
          <>
            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="exchange rates table">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <TableCell>Currency</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell align="right">Rate (1 {baseCurrency} =)</TableCell>
                    <TableCell align="right">Converted (100 {baseCurrency})</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCurrencies.length > 0 ? (
                    paginatedCurrencies.map((currency) => (
                      <TableRow
                        key={currency.code}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'light'
                              ? 'rgba(0, 0, 0, 0.04)'
                              : 'rgba(255, 255, 255, 0.08)',
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {currency.name}
                        </TableCell>
                        <TableCell>{currency.code}</TableCell>
                        <TableCell align="right">{currency.rate.toFixed(4)}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(currency.rate * 100, currency.code)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No currencies match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={currenciesWithRates.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RatesTable;
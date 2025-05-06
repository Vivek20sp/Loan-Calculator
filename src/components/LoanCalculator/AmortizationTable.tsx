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
  Paper,
  TablePagination,
  useTheme,
  Divider,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/calculationUtils';

const AmortizationTable: React.FC = () => {
  const theme = useTheme();
  const { emiResult, baseCurrency } = useAppContext();
  const { amortizationSchedule } = emiResult;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableOpen, setTableOpen] = useState(true);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = useMemo(() => {
    return amortizationSchedule.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [amortizationSchedule, page, rowsPerPage]);

  const toggleTable = () => {
    setTableOpen(!tableOpen);
  };

  return (
    <Card elevation={1} sx={{ mt: 4, mb: 4 }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={toggleTable}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FileText size={20} color={theme.palette.primary.main} />
            <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 600 }}>
              Amortization Schedule
            </Typography>
          </Box>
          <Tooltip title={tableOpen ? 'Collapse' : 'Expand'}>
            <IconButton size="small">
              {tableOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </IconButton>
          </Tooltip>
        </Box>

        <Divider />

        <Collapse in={tableOpen} timeout="auto">
          {amortizationSchedule.length > 0 ? (
            <>
              <TableContainer component={Paper} elevation={0}>
                <Table aria-label="amortization table">
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: theme.palette.mode === 'light'
                          ? 'rgba(0, 0, 0, 0.04)'
                          : 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <TableCell>#</TableCell>
                      <TableCell>Payment Date</TableCell>
                      <TableCell align="right">Payment</TableCell>
                      <TableCell align="right">Principal</TableCell>
                      <TableCell align="right">Interest</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((entry) => (
                      <TableRow
                        key={entry.paymentNumber}
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
                          {entry.paymentNumber}
                        </TableCell>
                        <TableCell>{formatDate(entry.paymentDate)}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(entry.scheduledPayment, baseCurrency)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(entry.principal, baseCurrency)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(entry.interest, baseCurrency)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(entry.endingBalance, baseCurrency)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={amortizationSchedule.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                No amortization data available. Please calculate a loan first.
              </Typography>
            </Box>
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AmortizationTable;
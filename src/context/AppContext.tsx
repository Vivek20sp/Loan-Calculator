import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoanParams, EMIResult, Currency, ExchangeRateData, PaymentFrequency, ConvertedAmount } from '../types';
import useExchangeRates from '../hooks/useExchangeRates';
import useEMICalculator from '../hooks/useEMICalculator';

const defaultLoanParams: LoanParams = {
  principal: 100000,
  interestRate: 5,
  loanTerm: 20,
  paymentFrequency: PaymentFrequency.MONTHLY,
};

const defaultEMIResult: EMIResult = {
  emi: 0,
  totalPayment: 0,
  totalInterest: 0,
  amortizationSchedule: [],
};

interface AppContextType {
  loanParams: LoanParams;
  emiResult: EMIResult;
  updateLoanParams: (params: Partial<LoanParams>) => void;
  calculateEMI: () => void;
  
  baseCurrency: string;
  targetCurrency: string;
  setBaseCurrency: (currency: string) => void;
  setTargetCurrency: (currency: string) => void;
  exchangeRates: ExchangeRateData | null;
  isLoadingRates: boolean;
  ratesError: string | null;
  convertAmount: (amount: number) => ConvertedAmount;
  supportedCurrencies: Currency[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [loanParams, setLoanParams] = useState<LoanParams>(defaultLoanParams);
  const [emiResult, setEmiResult] = useState<EMIResult>(defaultEMIResult);
  
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');

  const { calculateLoanDetails } = useEMICalculator();
  const { 
    exchangeRates, 
    isLoading: isLoadingRates, 
    error: ratesError,
    supportedCurrencies,
    convertCurrency 
  } = useExchangeRates(baseCurrency);

  const updateLoanParams = (params: Partial<LoanParams>) => {
    setLoanParams(prev => ({ ...prev, ...params }));
  };

  const calculateEMI = () => {
    const result = calculateLoanDetails(loanParams);
    setEmiResult(result);
  };

  const convertAmount = (amount: number): ConvertedAmount => {
    return convertCurrency(amount, baseCurrency, targetCurrency);
  };

  const value: AppContextType = {
    loanParams,
    emiResult,
    updateLoanParams,
    calculateEMI,
    baseCurrency,
    targetCurrency,
    setBaseCurrency,
    setTargetCurrency,
    exchangeRates,
    isLoadingRates,
    ratesError,
    convertAmount,
    supportedCurrencies,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
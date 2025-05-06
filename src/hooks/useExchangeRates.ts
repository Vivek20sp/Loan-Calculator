import { useState, useEffect, useCallback } from 'react';
import { ExchangeRateData, Currency, ConvertedAmount } from '../types';
import { 
  getExchangeRates, 
  getSupportedCurrencies, 
  getMockExchangeRates, 
  getMockCurrencies 
} from '../utils/api';

const useExchangeRates = (baseCurrency: string = 'USD') => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateData | null>(null);
  const [supportedCurrencies, setSupportedCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await getExchangeRates(baseCurrency);
      setExchangeRates(data);
    } catch (err) {
      console.error('Error fetching exchange rates:', err);
      
      setExchangeRates(getMockExchangeRates(baseCurrency));
      
      let errorMessage = 'Failed to fetch exchange rates. Using fallback data.';
      if (err instanceof Error) {
        errorMessage = `${errorMessage} (${err.message})`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [baseCurrency]);

  const fetchCurrencies = useCallback(async () => {
    try {

      const currencies = await getSupportedCurrencies();
      setSupportedCurrencies(currencies);

    } catch (err) {
      console.error('Error fetching currencies:', err);
      
      setSupportedCurrencies(getMockCurrencies());
      
      let errorMessage = 'Failed to fetch currencies. Using fallback data.';
      if (err instanceof Error) {
        errorMessage = `${errorMessage} (${err.message})`;
      }
      
      setError(errorMessage);
    }
  }, []);

  const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): ConvertedAmount => {
    if (!exchangeRates) {
      return {
        amount,
        fromCurrency,
        toCurrency,
        exchangeRate: 1,
        convertedAmount: amount,
      };
    }
    let exchangeRate = 1;
    
    if (exchangeRates.base_code === fromCurrency) {
      exchangeRate = exchangeRates.conversion_rates[toCurrency] || 1;
    } else if (exchangeRates.base_code === toCurrency) {
      exchangeRate = 1 / (exchangeRates.conversion_rates[fromCurrency] || 1);
    } else {
      const fromRate = exchangeRates.conversion_rates[fromCurrency] || 1;
      const toRate = exchangeRates.conversion_rates[toCurrency] || 1;
      exchangeRate = toRate / fromRate;
    }

    return {
      amount,
      fromCurrency,
      toCurrency,
      exchangeRate,
      convertedAmount: amount * exchangeRate,
    };
  };

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates, baseCurrency]);

  return {
    exchangeRates,
    supportedCurrencies,
    isLoading,
    error,
    refreshRates: fetchRates,
    convertCurrency,
  };
};

export default useExchangeRates;
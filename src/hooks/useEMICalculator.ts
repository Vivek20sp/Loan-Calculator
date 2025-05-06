import { useState } from 'react';
import { LoanParams, EMIResult } from '../types';
import { 
  getPeriodicRate, 
  getTotalPayments, 
  calculateEMI, 
  generateAmortizationSchedule 
} from '../utils/calculationUtils';

const useEMICalculator = () => {
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const calculateLoanDetails = (params: LoanParams): EMIResult => {
    try {
      setIsCalculating(true);
      setError(null);

      const { principal, interestRate, loanTerm, paymentFrequency } = params;
      if (principal <= 0) throw new Error('Principal amount must be greater than zero');
      if (interestRate < 0) throw new Error('Interest rate cannot be negative');
      if (loanTerm <= 0) throw new Error('Loan term must be greater than zero');
      const periodicRate = getPeriodicRate(interestRate, paymentFrequency);
      
      const totalPayments = getTotalPayments(loanTerm, paymentFrequency);
      
      const emi = calculateEMI(principal, periodicRate, totalPayments);
      
      const amortizationSchedule = generateAmortizationSchedule(
        principal,
        periodicRate,
        emi,
        totalPayments,
        paymentFrequency
      );
      
      const totalPayment = emi * totalPayments;
      const totalInterest = totalPayment - principal;
      
      return {
        emi,
        totalPayment,
        totalInterest,
        amortizationSchedule,
      };
    } catch (err) {
      let errorMessage = 'An error occurred during calculation';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      
      return {
        emi: 0,
        totalPayment: 0,
        totalInterest: 0,
        amortizationSchedule: [],
      };
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    calculateLoanDetails,
    isCalculating,
    error,
  };
};

export default useEMICalculator;
import { LoanParams, AmortizationEntry, PaymentFrequency } from '../types';

/**
 * Convert annual interest rate to period rate based on payment frequency
 */
export const getPeriodicRate = (
  annualRate: number, 
  frequency: PaymentFrequency
): number => {
  const periodsPerYear = getPeriodsPerYear(frequency);
  return (annualRate / 100) / periodsPerYear;
};

/**
 * Get number of periods per year based on payment frequency
 */
export const getPeriodsPerYear = (frequency: PaymentFrequency): number => {
  switch (frequency) {
    case PaymentFrequency.MONTHLY:
      return 12;
    case PaymentFrequency.QUARTERLY:
      return 4;
    case PaymentFrequency.SEMI_ANNUALLY:
      return 2;
    case PaymentFrequency.ANNUALLY:
      return 1;
    default:
      return 12;
  }
};

/**
 * Calculate total number of payments
 */
export const getTotalPayments = (
  loanTerm: number, 
  frequency: PaymentFrequency
): number => {
  const periodsPerYear = getPeriodsPerYear(frequency);
  return loanTerm * periodsPerYear;
};

/**
 * Calculate EMI (Equated Monthly Installment)
 * Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]
 * where:
 * P = Principal loan amount
 * R = Interest rate per period
 * N = Total number of payments
 */
export const calculateEMI = (
  principal: number, 
  periodicRate: number, 
  totalPayments: number
): number => {
  if (periodicRate === 0) {
    return principal / totalPayments;
  }

  const numerator = principal * periodicRate * Math.pow(1 + periodicRate, totalPayments);
  const denominator = Math.pow(1 + periodicRate, totalPayments) - 1;
  
  return numerator / denominator;
};

/**
 * Generate amortization schedule
 */
export const generateAmortizationSchedule = (
  principal: number,
  periodicRate: number,
  emi: number,
  totalPayments: number,
  frequency: PaymentFrequency
): AmortizationEntry[] => {
  const schedule: AmortizationEntry[] = [];
  let balance = principal;
  let cumulativeInterest = 0;
  const today = new Date();
  
  for (let i = 1; i <= totalPayments; i++) {
    // Calculate interest for this period
    const interestPayment = balance * periodicRate;
    
    // Calculate principal for this period
    const principalPayment = emi - interestPayment;
    
    // Update the balance
    balance = balance - principalPayment;
    
    // For the last payment, adjust to ensure balance becomes exactly zero
    if (i === totalPayments) {
      balance = 0;
    }
    
    // Update cumulative interest
    cumulativeInterest += interestPayment;
    
    // Calculate payment date
    const paymentDate = new Date(today);
    
    switch (frequency) {
      case PaymentFrequency.MONTHLY:
        paymentDate.setMonth(today.getMonth() + i);
        break;
      case PaymentFrequency.QUARTERLY:
        paymentDate.setMonth(today.getMonth() + (i * 3));
        break;
      case PaymentFrequency.SEMI_ANNUALLY:
        paymentDate.setMonth(today.getMonth() + (i * 6));
        break;
      case PaymentFrequency.ANNUALLY:
        paymentDate.setFullYear(today.getFullYear() + i);
        break;
    }
    
    // Add entry to schedule
    schedule.push({
      paymentNumber: i,
      paymentDate,
      beginningBalance: balance + principalPayment,
      scheduledPayment: emi,
      principal: principalPayment,
      interest: interestPayment,
      endingBalance: balance,
      totalInterest: cumulativeInterest,
    });
  }
  
  return schedule;
};

/**
 * Format currency with specified locale and currency code
 */
export const formatCurrency = (
  amount: number, 
  currencyCode: string = 'USD', 
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date with specified locale
 */
export const formatDate = (
  date: Date, 
  locale: string = 'en-US'
): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Format percentage with specified locale
 */
export const formatPercentage = (
  value: number, 
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};
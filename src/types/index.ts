
export interface LoanParams {
  principal: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: PaymentFrequency;
}

export interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  paymentNumber: number;
  paymentDate: Date;
  beginningBalance: number;
  scheduledPayment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  totalInterest: number;
}

export interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

export interface ExchangeRateData {
  base_code: string;
  conversion_rates: Record<string, number>;
  time_last_update_unix: number;
}

export interface ConvertedAmount {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  convertedAmount: number;
}

export enum PaymentFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUALLY = 'semi-annually',
  ANNUALLY = 'annually'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}
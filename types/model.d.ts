export type PurchaseHistory = {
  id: number;
  purchase_date: string;
  usecase: number;
  store_name: string;
  item_name: string;
  billing_method: number;
  price: number;
  person?: number;
  payment_month?: string;
  note?: string;
  pastime?: number;
  points?: number;
};

export type AdditionalIncome = {
  id: number;
  gain_date: string;
  reason: string;
  bank_account: number;
  amount: number;
  usecase?: number;
};

export type BankAccount = {
  id: number;
  name: string;
};

export type BillingMethod = {
  id: number;
  name: string;
  payment_method: number;
  bank_account_from?: number;
  bank_account_to?: number;
  closing_date_num?: number;
  debit_date_num?: number;
  note?: string;
};

export type Budget = {
  id: number;
  budget_type: number;
  usecase: number;
  amount: number;
  start_date: string;
  end_date: string;
};

export type BudgetType = {
  id: number;
  name: string;
};

export type DepositHistory = {
  id: number;
  date: string;
  bank_account_to: number;
  bank_account_from: number;
  reason: string;
  amount: number;
  balance: number;
  deposit_type?: number;
  usecase?: number;
};

export type DepositType = {
  id: number;
  billing_method?: number;
  target_table?: string;
};

export type MonthlyIncome = {
  id: number;
  person: number;
  start_year_month: string;
  amount: number;
};

export type Pastime = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
};

export type PaymentMethod = {
  id: number;
  name: string;
};

export type Person = {
  id: number;
  name: string;
};

export type StockHistory = {
  id: number;
  stock_trade_type: number;
  trade_date: string;
  usecase: number;
  symbol: string;
  yen_price?: number;
  dollar_price?: float;
  excange_rate?: float;
  count: number;
  incom_tax?: number;
  municipal_tax?: number;
  fee?: number;
};

export type StockTradeType = {
  id: number;
  name: string;
};

export type UseCase = {
  id: number;
  name: string;
};

export type MedicalExpensesDeduction = {
  id: number;
  person: number;
  name_of_hospital_and_pharmacy: string;
  medical_care_and_treatment: boolean;
  pharmaceutical_purchasing: boolean;
  other_medical_expenses: boolean;
  amount: number;
  amount_to_be_covered: number;
  payment_date: string;
};

import type {
  PurchaseHistory,
  AdditionalIncome,
  BankAccount,
  BillingMethod,
  Budget,
  BudgetType,
  DepositHistory,
  DepositType,
  MonthlyIncome,
  Pastime,
  PaymentMethod,
  Person,
  StockHistory,
  StockTradeType,
  UseCase,
  MedicalExpensesDeduction,
} from './model';
import type { FunctionsClient } from '@supabase/functions-js';
import type {
  PostgrestClient,
  PostgrestFilterBuilder,
  PostgrestQueryBuilder,
} from '@supabase/postgrest-js';
import type {
  RealtimeChannel,
  RealtimeChannelOptions,
  RealtimeClient,
} from '@supabase/realtime-js';
import type { StorageClient as SupabaseStorageClient } from '@supabase/storage-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { SupabaseAuthClient } from '@supabase/supabase-js/src/lib/SupabaseAuthClient';
import type {
  Fetch,
  GenericSchema,
  SupabaseClientOptions,
} from '@supabase/supabase-js/src/lib/types';

type Tables = {
  t_purchase_history: {
    Row: PurchaseHistory;
    Insert: Partial<PurchaseHistory>;
  };
  t_additional_income: {
    Row: AdditionalIncome;
    Insert: Partial<AdditionalIncome>;
  };
  m_bank_account: {
    Row: BankAccount;
  };
  m_billing_method: {
    Row: BillingMethod;
  };
  t_budget: {
    Row: Budget;
    Insert: Partial<Budget>;
  };
  m_budget_type: {
    Row: BudgetType;
  };
  t_deposit_history: {
    Row: DepositHistory;
    Insert: Partial<DepositHistory>;
  };
  m_deposit_type: {
    Row: DepositType;
  };
  t_monthly_income: {
    Row: MonthlyIncome;
    Insert: Partial<MonthlyIncome>;
  };
  t_pastime: {
    Row: Pastime;
    Insert: Partial<Pastime>;
  };
  m_payment_method: {
    Row: PaymentMethod;
  };
  m_person: {
    Row: Person;
  };
  t_stock_hinstory: {
    Row: StockHistory;
    Insert: Partial<StockHistory>;
  };
  m_stock_trade_type: {
    Row: StockTradeType;
  };
  m_usecase: {
    Row: UseCase;
  };
  t_medical_expenses_deduction: {
    Row: MedicalExpensesDeduction;
    Insert: Partial<MedicalExpensesDeduction>;
  };
};

type Database = {
  public: {
    Tables: Tables;
    Views: {};
    Functions: {};
  };
};

class StrictSupabaseClient<
  const Database = any,
  const SchemaName extends string &
    keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database,
  const Schema extends GenericSchema = Database[SchemaName] extends GenericSchema
    ? Database[SchemaName]
    : any,
> extends SupabaseClient<Database, SchemaName, Schema> {
  override from<
    const TableName extends keyof Schema['Tables'],
    const Table extends Schema['Tables'][TableName],
  >(relation: TableName): PostgrestQueryBuilder<Schema, Table>;
  override from<
    const ViewName extends keyof Schema['Views'],
    const View extends Schema['Views'][ViewName],
  >(relation: ViewName): PostgrestQueryBuilder<Schema, View>;
}

declare global {
  const useSupabaseAuthClient: () => StrictSupabaseClient<
    Database,
    'public',
    Database['public']
  >;
}

import { defineStore, storeToRefs } from 'pinia';
import {
  AdditionalIncome,
  BankAccount,
  BillingMethod,
  Budget,
  BudgetType,
  DepositHistory,
  DepositType,
  MedicalExpensesDeduction,
  MonthlyIncome,
  Pastime,
  PaymentMethod,
  Person,
  PurchaseHistory,
  StockHistory,
  StockTradeType,
  UseCase,
} from 'types/model';
import { Search } from 'types/search';

export const useDatabase = defineStore('database', () => {
  const purchaseHistories = ref<PurchaseHistory[]>([]);
  const additionalIncomes = ref<AdditionalIncome[]>([]);
  const bankAccounts = ref<BankAccount[]>([]);
  const billingMethods = ref<BillingMethod[]>([]);
  const budgets = ref<Budget[]>([]);
  const budgetTypes = ref<BudgetType[]>([]);
  const depositHistories = ref<DepositHistory[]>([]);
  const depositTypes = ref<DepositType[]>([]);
  const monthlyIncomes = ref<MonthlyIncome[]>([]);
  const pastimes = ref<Pastime[]>([]);
  const paymentMethods = ref<PaymentMethod[]>([]);
  const persons = ref<Person[]>([]);
  const stockHistories = ref<StockHistory[]>([]);
  const stockTradeTypes = ref<StockTradeType[]>([]);
  const usecases = ref<UseCase[]>([]);
  const medicalExpensesDeduction = ref<MedicalExpensesDeduction[]>([]);

  const supabase = useSupabaseAuthClient();

  const year = new Date().getFullYear();
  const fetchPurchaseHistories = () =>
    supabase
      .from('t_purchase_history')
      .select('*')
      .order('purchase_date', { ascending: false })
      .limit(1000)
      .then(({ data }) => (purchaseHistories.value = data ?? []));
  fetchPurchaseHistories();
  const fetchAdditionalIncomes = () =>
    supabase
      .from('t_additional_income')
      .select('*')
      .then(({ data }) => (additionalIncomes.value = data ?? []));
  fetchAdditionalIncomes();
  const fetchBankAccounts = () =>
    supabase
      .from('m_bank_account')
      .select('*')
      .then(({ data }) => (bankAccounts.value = data ?? []));
  fetchBankAccounts();
  const fetchBillingMethod = () =>
    supabase
      .from('m_billing_method')
      .select('*')
      .then(({ data }) => (billingMethods.value = data ?? []));
  fetchBillingMethod();
  const fetchBudgets = () =>
    supabase
      .from('t_budget')
      .select('*')
      .then(({ data }) => (budgets.value = data ?? []));
  fetchBudgets();
  supabase
    .from('m_budget_type')
    .select('*')
    .then(({ data }) => (budgetTypes.value = data ?? []));
  const fetchDepositHistories = () =>
    supabase
      .from('t_deposit_history')
      .select('*')
      .then(({ data }) => (depositHistories.value = data ?? []));
  fetchDepositHistories();
  supabase
    .from('m_deposit_type')
    .select('*')
    .then(({ data }) => (depositTypes.value = data ?? []));
  const fetchMonthlyIncoms = () =>
    supabase
      .from('t_monthly_income')
      .select('*')
      .then(({ data }) => (monthlyIncomes.value = data ?? []));
  fetchMonthlyIncoms();
  const fetchPastimes = () =>
    supabase
      .from('t_pastime')
      .select('*')
      .gte('start_date', `${year}-01-01`)
      .order('start_date', { ascending: true })
      .limit(30)
      .then(({ data }) => (pastimes.value = data ?? []));
  fetchPastimes();
  supabase
    .from('m_payment_method')
    .select('*')
    .then(({ data }) => (paymentMethods.value = data ?? []));
  supabase
    .from('m_person')
    .select('*')
    .then(({ data }) => (persons.value = data ?? []));
  const fetchStockHistories = () =>
    supabase
      .from('t_stock_hinstory')
      .select('*')
      .then(({ data }) => (stockHistories.value = data ?? []));
  fetchStockHistories();
  supabase
    .from('m_stock_trade_type')
    .select('*')
    .then(({ data }) => (stockTradeTypes.value = data ?? []));
  supabase
    .from('m_usecase')
    .select('*')
    .then(({ data }) => (usecases.value = data ?? []));
  const fetchMedicalEcpensesDeductions = () =>
    supabase
      .from('t_medical_expenses_deduction')
      .select('*')
      .then(({ data }) => (medicalExpensesDeduction.value = data ?? []));
  fetchMedicalEcpensesDeductions();

  return {
    purchaseHistories: computed(() => purchaseHistories.value),
    additionalIncomes: computed(() => additionalIncomes.value),
    bankAccounts: computed(() => bankAccounts.value),
    billingMethods: computed(() => billingMethods.value),
    budgets: computed(() => budgets.value),
    budgetTypes: computed(() => budgetTypes.value),
    depositHistories: computed(() => depositHistories.value),
    depositTypes: computed(() => depositTypes.value),
    monthlyIncomes: computed(() => monthlyIncomes.value),
    pastimes: computed(() => pastimes.value),
    paymentMethods: computed(() => paymentMethods.value),
    persons: computed(() => persons.value),
    stockHistories: computed(() => stockHistories.value),
    stockTradeTypes: computed(() => stockTradeTypes.value),
    usecases: computed(() => usecases.value),
    medicalExpensesDeduction: computed(() => medicalExpensesDeduction.value),

    async updatePurchaseHistory(purchaseHistory: Partial<PurchaseHistory>) {
      const { error } = await supabase
        .from('t_purchase_history')
        .upsert(purchaseHistory);
      if (error) {
        alert(error.message);
        return;
      }
      fetchPurchaseHistories();
    },
    async updateAdditionalIncome(additionalIncome: Partial<AdditionalIncome>) {
      const { error } = await supabase
        .from('t_additional_income')
        .upsert(additionalIncome);
      if (error) {
        alert(error.message);
        return;
      }
      fetchAdditionalIncomes();
    },
    async updateBudget(budget: Partial<Budget>) {
      const { error } = await supabase.from('t_budget').upsert(budget);
      if (error) {
        alert(error.message);
        return;
      }
      fetchBudgets();
    },
    async updateDepositHistory(depositHistory: Partial<DepositHistory>) {
      const { error } = await supabase
        .from('t_deposit_history')
        .upsert(depositHistory);
      if (error) {
        alert(error.message);
        return;
      }
      fetchDepositHistories;
    },
    async updateMonthlyIncome(monthlyIncome: Partial<MonthlyIncome>) {
      const { error } = await supabase
        .from('t_monthly_income')
        .upsert(monthlyIncome);
      if (error) {
        alert(error.message);
        return;
      }
      fetchMonthlyIncoms();
    },
    async updatePastime(pastime: Partial<Pastime>) {
      const { error } = await supabase.from('t_pastime').insert(pastime);
      if (error) {
        alert(error.message);
        return;
      }
      fetchPastimes();
    },
    async updateStockHistory(stockHistory: Partial<StockHistory>) {
      const { error } = await supabase
        .from('t_stock_hinstory')
        .insert(stockHistory);
      if (error) {
        alert(error.message);
        return;
      }
      fetchStockHistories();
    },
    async updateMedicalExpensesDeducation(
      medicalExpensesEducarion: Partial<MedicalExpensesDeduction>,
    ) {
      const { error } = await supabase
        .from('t_medical_expenses_deduction')
        .insert(medicalExpensesEducarion);
      if (error) {
        alert(error.message);
        return;
      }
      fetchMedicalEcpensesDeductions();
    },
    calculatePastimeTotalAmount(pastimeId: Pastime['id']): number {
      return purchaseHistories.value
        .filter((purchaseHistory) => purchaseHistory.pastime === pastimeId)
        .reduce((totalAmount, purchaseHistory) => {
          return totalAmount + purchaseHistory.price;
        }, 0);
    },
    async serchPurchaseHistories(searchDetails: Partial<Search>) {
      console.log('hello!');
      let select = supabase.from('t_purchase_history').select('*');
      if (searchDetails.startDate) {
        select = select.gte('purchase_date', searchDetails.startDate);
      }
      if (searchDetails.endDate) {
        select = select.lte('purchase_date', searchDetails.endDate);
      }
      if (searchDetails.usecase && searchDetails.usecase.length > 0) {
        select = select.in('usecase', searchDetails.usecase);
      }
      if (searchDetails.storeName) {
        select = select.like('store_name', '%' + searchDetails.storeName + '%');
      }
      if (searchDetails.itemName) {
        select = select.like('item_name', '%' + searchDetails.itemName + '%');
      }
      if (
        searchDetails.billingMethod &&
        searchDetails.billingMethod.length > 0
      ) {
        select = select.in('billing_method', searchDetails.billingMethod);
      }
      if (searchDetails.minPrice) {
        select = select.gte('price', searchDetails.minPrice);
      }
      if (searchDetails.maxPrice) {
        select = select.lte('price', searchDetails.maxPrice);
      }
      const { data } = await select
        .order('purchase_date', { ascending: false })
        .limit(1000);
      purchaseHistories.value = data ?? [];
    },
  };
});

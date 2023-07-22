<script setup lang="ts">
import {
  BillingMethod,
  UseCase,
  type Pastime,
  type PurchaseHistory,
  Person,
} from '~/types/model';

definePageMeta({ layout: 'main' });

const isPurchaseModalActive = useState(() => false);
const edittingPurchaseHistoryId = useState<PurchaseHistory['id']>();
const supabase = useSupabaseAuthClient();

const purchaseHistories = useState<PurchaseHistory[]>(() => []);
purchaseHistories.value =
  (await supabase.from('t_purchase_history').select('*')).data ?? [];
const persons = useState<Person[]>(() => []);
persons.value = (await supabase.from('m_person').select('*')).data ?? [];
const usecases = useState<UseCase[]>(() => []);
usecases.value = (await supabase.from('m_usecase').select('*')).data ?? [];
const billingMethods = useState<BillingMethod[]>(() => []);
billingMethods.value =
  (await supabase.from('m_billing_method').select('*')).data ?? [];
const pastimes = useState<Pastime[]>(() => []);
pastimes.value = (await supabase.from('t_pastime').select('*')).data ?? [];

const edittingPurchaseHistory = computed<PurchaseHistory | undefined>(() =>
  purchaseHistories.value.find(
    (purchaseHistory) => purchaseHistory.id === edittingPurchaseHistoryId.value,
  ),
);

function activeSwitchForParchase(id: PurchaseHistory['id']) {
  isPurchaseModalActive.value = !isPurchaseModalActive.value;
  edittingPurchaseHistoryId.value = id;
}
function closeModalForParchase() {
  isPurchaseModalActive.value = false;
}
async function saveModalForPurchase(
  purchaseHistoryInput: Partial<PurchaseHistory>,
) {
  isPurchaseModalActive.value = false;

  const { data, error } = await supabase
    .from('t_purchase_history')
    .insert([purchaseHistoryInput])
    .select();

  console.log('save', data);
}
async function savePastime(pastimeInput: Partial<Pastime>) {
  const { data, error } = await supabase
    .from('t_pastime')
    .insert([pastimeInput])
    .select();
  if (error) {
    alert(error.message);
    return;
  }
  if (!data) return;
  pastimes.value.push(...data);
}
</script>

<template>
  <template comments>登録ボタン描画</template>
  <VContainer>
    <v-row justify="end">
      <v-btn color="teal-lighten-1" @click="activeSwitchForParchase"
        >レコード追加</v-btn
      >
    </v-row>
  </VContainer>
  <template comments>テーブル描画</template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">購入日</th>
        <th class="text-left">用途</th>
        <th class="text-left">購入店</th>
        <th class="text-left">商品</th>
        <th class="text-left">支払方法</th>
        <th class="text-left">価格</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="purchaseHistory in purchaseHistories"
        :key="purchaseHistory.id"
        @click="activeSwitchForParchase(purchaseHistory.id)"
      >
        <td>{{ purchaseHistory.id }}</td>
        <td>{{ purchaseHistory.purchase_date }}</td>
        <td>{{ purchaseHistory.usecase }}</td>
        <td>{{ purchaseHistory.store_name }}</td>
        <td>{{ purchaseHistory.item_name }}</td>
        <td>{{ purchaseHistory.billing_method }}</td>
        <td>{{ purchaseHistory.price }}</td>
      </tr>
    </tbody>
  </v-table>

  <template comments>購入履歴詳細描画</template>
  <v-row justify="center"> </v-row>
  <PurchaseEditModal
    :active="isPurchaseModalActive"
    :purchaseHistory="edittingPurchaseHistory"
    :persons="persons ?? []"
    :billing-methods="billingMethods ?? []"
    :usecases="usecases ?? []"
    :pastimes="pastimes ?? []"
    @close="closeModalForParchase"
    @save:purchase="saveModalForPurchase"
    @save:pastime="savePastime"
  />
</template>

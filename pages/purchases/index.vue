<script setup lang="ts">
import { type Pastime, type PurchaseHistory } from '~/types/model';
import { useDatabase } from '~/stores/database';
import { emit } from 'process';
import { Search } from 'types/search';

definePageMeta({ layout: 'main' });

const isPurchaseSerchModalActive = useState(() => false);
const isPurchaseEditModalActive = useState(() => false);
const edittingPurchaseHistoryId = useState<PurchaseHistory['id']>();
const database = useDatabase();

const edittingPurchaseHistory = computed<PurchaseHistory | undefined>(() =>
  database.purchaseHistories.find(
    (purchaseHistory) => purchaseHistory.id === edittingPurchaseHistoryId.value,
  ),
);
function activeSwitchForSerch() {
  isPurchaseSerchModalActive.value = !isPurchaseSerchModalActive.value;
}
function activeSwitchForParchase(id: PurchaseHistory['id']) {
  isPurchaseEditModalActive.value = !isPurchaseEditModalActive.value;
  edittingPurchaseHistoryId.value = id;
}
function closeModalForSerch() {
  isPurchaseSerchModalActive.value = false;
}
function closeModalForParchase() {
  isPurchaseEditModalActive.value = false;
}
async function saveModalForPurchase(
  purchaseHistoryInput: Partial<PurchaseHistory>,
) {
  isPurchaseEditModalActive.value = false;
  database.updatePurchaseHistory(purchaseHistoryInput);
}
async function savePastime(pastimeInput: Partial<Pastime>) {
  database.updatePastime(pastimeInput);
}
async function searchPurchaseHistories(searchDetails: Partial<Search>) {
  await database.serchPurchaseHistories(searchDetails);
  console.log(searchDetails);
  isPurchaseSerchModalActive.value = false;
}
</script>

<template>
  <template comments>登録ボタン描画</template>
  <VContainer>
    <div class="d-flex flex-row-reverse">
      <v-btn class="ma-2" color="teal-lighten-1" @click="activeSwitchForSerch">
        検索
      </v-btn>
      <v-btn
        class="ma-2o n"
        color="teal-lighten-1"
        @click="activeSwitchForParchase"
        >レコード追加</v-btn
      >
    </div>
  </VContainer>
  <template comments>テーブル描画</template>
  <v-table fixed-header height="85vh">
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
        v-for="purchaseHistory in database.purchaseHistories"
        :key="purchaseHistory.id"
        @click="activeSwitchForParchase(purchaseHistory.id)"
      >
        <td>{{ purchaseHistory.id }}</td>
        <td>{{ purchaseHistory.purchase_date.replaceAll('-', '/') }}</td>
        <td>
          {{
            database.usecases.find(
              (usecase) => usecase.id === purchaseHistory.usecase,
            )?.name
          }}
        </td>
        <td>{{ purchaseHistory.store_name }}</td>
        <td>{{ purchaseHistory.item_name }}</td>
        <td>
          {{
            database.billingMethods.find(
              (billingMethod) =>
                billingMethod.id === purchaseHistory.billing_method,
            )?.name
          }}
        </td>
        <td style="text-align: right">
          {{ purchaseHistory.price.toLocaleString() }}
        </td>
      </tr>
    </tbody>
  </v-table>

  <template comments>購入履歴詳細描画</template>
  <v-row justify="center"> </v-row>
  <PurchaseEditModal
    :active="isPurchaseEditModalActive"
    :purchaseHistory="edittingPurchaseHistory"
    :persons="database.persons"
    :billing-methods="database.billingMethods"
    :usecases="database.usecases"
    :pastimes="database.pastimes"
    @close="closeModalForParchase"
    @save:purchase="saveModalForPurchase"
    @save:pastime="savePastime"
  />
  <PurchaseSerchModal
    :active="isPurchaseSerchModalActive"
    :usecases="database.usecases"
    :billingMethods="database.billingMethods"
    @close="closeModalForSerch"
    @search="searchPurchaseHistories"
  />
</template>

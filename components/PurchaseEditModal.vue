<script setup lang="ts">
import { VSelect } from 'vuetify/lib/components/index.mjs';
import type {
  BillingMethod,
  Pastime,
  Person,
  PurchaseHistory,
  UseCase,
} from '~/types/model';

interface Props {
  active: boolean;
  purchaseHistory?: Partial<PurchaseHistory>;
  usecases: UseCase[];
  billingMethods: BillingMethod[];
  persons: Person[];
  pastimes: Pastime[];
}
interface Emit {
  (e: 'save:purchase', data: Partial<PurchaseHistory>): void;
  (e: 'close'): void;
  (e: 'save:pastime', data: Partial<Pastime>): void;
}

const props = withDefaults(defineProps<Props>(), {
  purchaseHistory: () => ({}),
});
const emit = defineEmits<Emit>();

const purchaseHistoryInput = useState<Partial<PurchaseHistory>>(() => ({}));
const pastimeFlg = useState<boolean>(() => false);
const edittingPastimeId = useState<Pastime['id']>();
const isPastimeModalActive = useState(() => false);

watch(
  () => props.purchaseHistory,
  (_purchaseHistory) => {
    purchaseHistoryInput.value = _purchaseHistory ?? {};
    pastimeFlg.value = !!purchaseHistoryInput.value.pastime;
  },
  { immediate: true },
);

type SelectItems<Value> = {
  title: string;
  value: Value;
}[];

const usecaseItems = computed<SelectItems<PurchaseHistory['usecase']>>(() =>
  props.usecases.map((usecase) => ({ title: usecase.name, value: usecase.id })),
);

const billingMethodItems = computed<
  SelectItems<PurchaseHistory['billing_method']>
>(() =>
  props.billingMethods.map((billingMethod) => ({
    title: billingMethod.name,
    value: billingMethod.id,
  })),
);

const personItems = computed<
  SelectItems<NonNullable<PurchaseHistory['person']>>
>(() =>
  props.persons.map((person) => ({ title: person.name, value: person.id })),
);

const pastimeItems = computed<SelectItems<PurchaseHistory['pastime']>>(() =>
  props.pastimes
    .filter(
      (pastime) =>
        new Date(pastime.start_date).getTime() <=
          new Date(purchaseHistoryInput.value.purchase_date ?? '').getTime() &&
        new Date(pastime.end_date).getTime() >=
          new Date(purchaseHistoryInput.value.purchase_date ?? '').getTime(),
    )
    .map((pastime) => ({
      title: `${convertDateForDisplay(
        pastime.start_date,
      )}~${convertDateForDisplay(pastime.end_date)}：${pastime.name}`,
      value: pastime.id,
    })),
);

const edditingPastime = computed<Pastime | undefined>(() =>
  props.pastimes?.find((pastime) => pastime.id === edittingPastimeId.value),
);

function activeSwitchForPastime() {
  isPastimeModalActive.value = !isPastimeModalActive.value;
}
function closeModalForPastime() {
  isPastimeModalActive.value = false;
}
function saveModalForPastime(pastimeInput: Partial<Pastime>) {
  isPastimeModalActive.value = false;
  emit('save:pastime', pastimeInput);
}
</script>

<template>
  <v-dialog v-model="props.active" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">購入履歴詳細 </span>
      </v-card-title>
      <v-card-text>
        <span v-if="purchaseHistoryInput.id">
          ID: {{ purchaseHistoryInput.id }}</span
        >
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                type="date"
                label="購入日*"
                v-model="purchaseHistoryInput.purchase_date"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="用途*"
                v-model="purchaseHistoryInput.usecase"
                :items="usecaseItems"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="購入店*"
                v-model="purchaseHistoryInput.store_name"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="商品*"
                v-model="purchaseHistoryInput.item_name"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="支払方法*"
                v-model="purchaseHistoryInput.billing_method"
                :items="billingMethodItems"
                required
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="number"
                label="価格*"
                v-model="purchaseHistoryInput.price"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="人"
                v-model="purchaseHistoryInput.person"
                :items="personItems"
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="date"
                label="支払日"
                v-model="purchaseHistoryInput.payment_month"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="備考" v-model="purchaseHistoryInput.note">
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-checkbox label="娯楽フラグ" v-model="pastimeFlg"> </v-checkbox>
            </v-col>
            <v-col cols="12" sm="9">
              <v-select
                v-show="pastimeFlg"
                v-model="purchaseHistoryInput.pastime"
                :items="pastimeItems"
                append-icon="mdi-plus"
                @click:append="activeSwitchForPastime"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                type="numbre"
                label="ポイント利用分"
                v-model="purchaseHistoryInput.points"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="emit('close')">
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="emit('save:purchase', purchaseHistoryInput)"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <PastimeEditModal
    :active="isPastimeModalActive"
    :pastime="edditingPastime"
    @close="closeModalForPastime"
    @save="saveModalForPastime"
  />
</template>

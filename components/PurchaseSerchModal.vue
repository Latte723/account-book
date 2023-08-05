<script setup lang="ts">
import { UseCase, BillingMethod, PurchaseHistory } from 'types/model';
import { Search } from 'types/search';
import { SelectItems } from 'types/utils';

interface Props {
  active: boolean;
  usecases: UseCase[];
  billingMethods: BillingMethod[];
}
interface Emit {
  (e: 'close'): void;
  (e: 'search', data: Partial<Search>): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const selectedStartDate = useState(() => '');
const selectedEndDate = useState(() => '');
const selectedUsecases = useState(() => []);
const usecaseOptions = computed<SelectItems<PurchaseHistory['usecase']>>(() =>
  props.usecases.map((usecase) => ({ title: usecase.name, value: usecase.id })),
);
const selectedStoreName = useState(() => '');
const selectedItemName = useState(() => '');
const selectedBillingMethods = useState(() => []);
const billingMethodOptions = computed<
  SelectItems<PurchaseHistory['billing_method']>
>(() =>
  props.billingMethods.map((billingMethod) => ({
    title: billingMethod.name,
    value: billingMethod.id,
  })),
);
const selectedMinPrice = useState(() => undefined);
const selectedMaxPrice = useState(() => undefined);

function search() {
  emit('search', {
    startDate: selectedStartDate.value,
    endDate: selectedEndDate.value,
    usecase: selectedUsecases.value,
    storeName: selectedStoreName.value,
    itemName: selectedItemName.value,
    billingMethod: selectedBillingMethods.value,
    minPrice: selectedMinPrice.value,
    maxPrice: selectedMaxPrice.value,
  });
}

function refresh() {
  selectedStartDate.value = '';
  selectedEndDate.value = '';
  selectedUsecases.value = [];
  selectedStoreName.value = '';
  selectedItemName.value = '';
  selectedBillingMethods.value = [];
  selectedMinPrice.value = undefined;
  selectedMaxPrice.value = undefined;
}
</script>

<template>
  <v-dialog v-model="props.active" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">検索 </span>
      </v-card-title>
      <VContainer>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="selectedStartDate"
              type="date"
              label="開始日"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="selectedEndDate"
              type="date"
              label="終了日"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedUsecases"
              :items="usecaseOptions"
              label="使用用途"
              multiple
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="selectedStoreName"
              label="購入店"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="selectedItemName"
              label="商品"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="selectedBillingMethods"
              :items="billingMethodOptions"
              label="支払方法"
              multiple
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="selectedMinPrice"
              label="最小価格"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="selectedMaxPrice"
              label="最大価格"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
      </VContainer>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="refresh">
          refresh
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="emit('close')">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="search">
          Search
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

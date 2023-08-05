<script setup lang="ts">
import { useDatabase } from '~/stores/database';
import { Pastime } from '~/types/model';

definePageMeta({ layout: 'main' });

const database = useDatabase();
const edittingPastimeId = useState<Pastime['id']>();
const isPastimeModalActive = useState(() => false);

const edittingPastime = computed<Pastime | undefined>(() =>
  database.pastimes.find((pastime) => pastime.id === edittingPastimeId.value),
);

function activeSwitchForPastime(id: Pastime['id']) {
  isPastimeModalActive.value = !isPastimeModalActive.value;
  edittingPastimeId.value = id;
}
function closeModalForPastime() {
  isPastimeModalActive.value = false;
}
async function saveModalForPastime(pastimeInput: Partial<Pastime>) {
  isPastimeModalActive.value = false;
  database.updatePastime(pastimeInput);
}
</script>

<template>
  <template comments>登録ボタン描画</template>
  <VContainer>
    <v-row justify="end">
      <v-btn color="teal-lighten-1" @click="activeSwitchForPastime"
        >レコード追加</v-btn
      >
    </v-row>
  </VContainer>
  <template comments>テーブル描画</template>
  <v-table fixed-header height="85vh">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">開始日</th>
        <th class="text-left">終了日</th>
        <th class="text-left">行き先</th>
        <th class="text-left">合計金額</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="pastime in database.pastimes"
        :key="pastime.id"
        @click="activeSwitchForPastime(pastime.id)"
      >
        <td>{{ pastime.id }}</td>
        <td>{{ pastime.start_date }}</td>
        <td>{{ pastime.end_date }}</td>
        <td>{{ pastime.name }}</td>
        <td>
          {{
            database.calculatePastimeTotalAmount(pastime.id).toLocaleString()
          }}
        </td>
      </tr>
    </tbody>
  </v-table>

  <PastimeEditModal
    :active="isPastimeModalActive"
    :pastime="edittingPastime"
    @close="closeModalForPastime"
    @save="saveModalForPastime"
  />
</template>

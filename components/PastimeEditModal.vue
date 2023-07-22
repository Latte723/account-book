<script setup lang="ts">
import type { Pastime } from 'types/model';

interface Props {
  active: boolean;
  pastime?: Partial<Pastime>;
}
interface Emit {
  (e: 'save', date: Partial<Pastime>): void;
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  pastime: (): Partial<Pastime> => ({}),
});
const emit = defineEmits<Emit>();

const pastimeInput = useState<Partial<Pastime>>(() => ({}));
watch(
  () => props.pastime,
  (_pastime) => {
    pastimeInput.value = _pastime ?? {};
  },
  { immediate: true },
);
</script>

<template>
  <v-dialog v-model="props.active" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">娯楽詳細 </span>
      </v-card-title>
      <v-card-text>
        <span v-if="pastimeInput.id"> ID: {{ pastimeInput.id }}</span>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                type="date"
                label="開始日*"
                v-model="pastimeInput.start_date"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                type="date"
                label="終了日*"
                v-model="pastimeInput.end_date"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="行き先*"
                v-model="pastimeInput.name"
                required
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
          @click="emit('save', pastimeInput)"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

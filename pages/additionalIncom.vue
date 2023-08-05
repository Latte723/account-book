<script setup lang="ts">
import { AdditionalIncome } from 'types/model';

definePageMeta({ layout: 'main' });

const supabase = useSupabaseAuthClient();
const additionalIncomes = useState<AdditionalIncome[]>(() => []);
additionalIncomes.value =
  (await supabase.from('t_additional_income').select('*')).data ?? [];
</script>

<template></template>

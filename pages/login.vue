<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');

// Login method using providers
const login = async () => {
  const { error } = await supabase.auth.signInWithOtp({ email: email.value });

  if (error) {
    return alert('Something went wrong !');
  }

  router.push('/dashboard');
};
</script>

<template>
  <VSheet>
    <VForm>
      <VTextField v-model="email" type="email" label="email"></VTextField>
      <VBtn @click="login()">Login</VBtn>
    </VForm>
  </VSheet>
</template>

<style module>
.label {
  width: 100px;
  display: inline-block;
}
</style>

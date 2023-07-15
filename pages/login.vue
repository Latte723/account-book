<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();

const email = ref('');
const password = ref('');

// Login method using providers
const login = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    return alert('Something went wrong !');
  }

  router.push('/dashboard');
};
</script>

<template>
  <div>
    <label :class="$style.label">email</label>
    <input type="email" v-model="email" />
  </div>
  <div>
    <label :class="$style.label">password</label>
    <input type="password" v-model="password" />
  </div>
  <button @click="login()">Login</button>
</template>

<style module>
.label {
  width: 100px;
  display: inline-block;
}
</style>

<script setup lang="ts">
const client = useSupabaseAuthClient();
async function signOut() {
  await client.auth.signOut();
  await navigateTo('/login');
}
</script>

<template>
  <div>
    <header>
      <button @click="signOut">Logout</button>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

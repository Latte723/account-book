<script setup lang="ts">
const client = useSupabaseAuthClient();
async function signOut() {
  await client.auth.signOut();
  await navigateTo('/login');
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer class="bg-teal" theme="dark" permanent>
        <v-list color="transparent">
          <v-list-item
            title="購入履歴"
            @click="navigateTo('/purchases')"
          ></v-list-item>
          <v-list-item
            title="娯楽"
            @click="navigateTo('/pastime')"
          ></v-list-item>
          <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="signOut"> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

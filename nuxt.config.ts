// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@invictus.codes/nuxt-vuetify', '@nuxtjs/supabase', '@pinia/nuxt'],
  typescript: {
    strict: true,
  },
  pinia: {},
  supabase: {},
  vuetify: {
    vuetifyOptions: {},
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,
      /* vite-plugin-vuetify options */
      styles: 'sass',
      autoImport: true,
      useVuetifyLabs: true,
    },
  },
});

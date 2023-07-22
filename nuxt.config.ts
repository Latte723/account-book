// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@invictus.codes/nuxt-vuetify'],
  typescript: {
    strict: true,
  },
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

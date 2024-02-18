// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [  
    "@pinia/nuxt",
    "@nuxt/ui",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://172.233.74.117:8080/",
    },
  },
});

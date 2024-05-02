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
  colorMode:{
    preference:'light' //關閉NuxtUI預設的日夜切換模式，變成都只用日版
  }
});

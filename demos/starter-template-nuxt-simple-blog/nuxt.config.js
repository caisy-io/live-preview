import dynamicRoutes from "./helpers/dynamicRoutes";
import robotsConfig from "./robots.config";

export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    define: {
      global: {},
      // crypto: {},
    },
  },
  modules: [
    ["@nuxtjs/robots", robotsConfig],
    ["@funken-studio/sitemap-nuxt-3"],
  ],
  sitemap: {
    hostname: process.env.HOST_NAME || "http://localhost:3000/",
    routes: dynamicRoutes,
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    caisyProjectId: process.env.CAISY_PROJECT_ID,
    caisyApiKey: process.env.CAISY_API_KEY,
    DRAFT_MODE_SECRET: process.env.DRAFT_MODE_SECRET,
    public: {
      showOnboardingToast: process.env.SHOW_ONBOARDING_TOAST ?? true,
    },
  },
});

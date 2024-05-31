<template>
  <template v-if="!!liveProps">
    <Layout
      :seo="liveProps?.BlogArticle?.seo"
      :navigation="liveProps.Navigation"
      :footer="liveProps.Footer"
    >
      <Fulltext
        v-if="liveProps.BlogArticle?.text"
        :text="liveProps.BlogArticle.text"
      />
      <DefaultSpacer />
    </Layout>
    <CaisyConnectionIndicator />
  </template>
</template>

<script setup lang="ts">
import Layout from "~~/layouts/Layout.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, watch, onUnmounted } from "vue";
import { EPageType, getProps } from "~~/services/content/getProps";
import {
  caisyLivePreview,
  // useCaisyUpdates,
  createCaisyConnectionIndicator,
} from "@caisy/live-preview-javascript/test";
import CaisyConnectionIndicator from "@caisy/live-preview-vue/CaisyConnectionIndicator";
import { useCaisyUpdates } from "@caisy/live-preview-vue";
import "@caisy/live-preview-javascript/styles";
import "@caisy/live-preview-javascript/connectionIndicator";

const route = useRoute();
const { slug } = route.params;

const { data: props } = await useAsyncData(`blog ${slug}`, () =>
  getProps({ slug, pageType: EPageType.Blog })
);

// let close = null;

// Create a reactive reference for the previewToken
const previewToken = null;

// Get the router instance
const router = useRouter();

onMounted(() => {
  console.log("router.query", router.currentRoute.value.query);

  // Watch the router's query parameters for changes
  watch(
    () => router.currentRoute.value.query,
    (newQuery) => {
      let caisy_preview_access_token = newQuery.caisy_preview_access_token;
      if (caisy_preview_access_token) {
        localStorage.setItem(
          "caisy_preview_access_token",
          caisy_preview_access_token
        );
      } else {
        const localToken = localStorage.getItem("caisy_preview_access_token");
        if (localToken) {
          caisy_preview_access_token = localToken;
        }
      }

      close = caisyLivePreview({
        projectId: "322ad481-7595-4ad4-8c11-f30d9d81b0d3",
        token: caisy_preview_access_token,
        locale: "en",
        enabled: true,
        debug: true,
      });
    }
    // { immediate: true } // This ensures the watcher runs immediately with the initial value
  );
});

// onUnmounted(() => {
//   close && close();
// });

const liveProps = useCaisyUpdates({ ...props._rawValue });

// const liveProps = props;

// console.log({ liveProps });

if (props.is404) navigateTo("/404");
</script>

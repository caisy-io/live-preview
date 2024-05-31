<template>
  <Page v-bind="props" />
  <CaisyConnectionIndicator />
</template>

<script setup lang="ts">
import { EPageType, getProps } from "~~/services/content/getProps";
import Page from "~~/layouts/Page.vue";
import CaisyConnectionIndicator from "@caisy/live-preview-vue/CaisyConnectionIndicator";
import { onMounted, onUnmounted } from "vue";
// import livePreviewJavascript from "@caisy/live-preview-javascript";
import { caisyLivePreview } from "@caisy/live-preview-javascript/test";
// import "@caisy/live-preview-javascript/inpsect";
// import "@caisy/live-preview-javascript/connectionIndicator";
// import { getCaisyToken } from "@caisy/live-preview-javascript";

let close = null;

// console.log({ token: getCaisyToken() });

onMounted(() => {
  close = caisyLivePreview({
    projectId: "322ad481-7595-4ad4-8c11-f30d9d81b0d3",
    // token: getCaisyToken(),
    token: "asdsad",
    locale: "en",
    enabled: true,
    debug: true,
  });
});

onUnmounted(() => {
  close && close();
});

const { data: props } = await useAsyncData("home", () =>
  getProps({ pageType: EPageType.Index })
);

if (props.is404) navigateTo("/404");
</script>

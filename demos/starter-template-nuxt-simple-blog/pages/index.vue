<template>
  <Page v-bind="props" />
  <CaisyConnectionIndicator />
</template>

<script setup>
import { EPageType, getProps } from "~~/services/content/getProps";
import Page from "~~/layouts/Page.vue";
import CaisyConnectionIndicator from "@nicolasshiken/live-preview-vue/caisyConnectionIndicator";
import { caisyLivePreview } from "@nicolasshiken/live-preview-vue/caisyLivePreview";
// import { getCaisyInspectProps } from "@nicolasshiken/live-preview-vue/getCaisyInspectProps";
import { getCaisyCookie } from "@nicolasshiken/live-preview-vue/getCaisyCookie";

const { data: props } = await useAsyncData("home", () =>
  getProps({ pageType: EPageType.Index })
);

if (props.is404) navigateTo("/404");

onMounted(() => {
  caisyLivePreview({
    projectId: process.env.NEXT_PUBLIC_CAISY_PROJECT_ID,
    token: getCaisyCookie(),
    locale: router.locale,
    enabled: true,
    debug: true,
  });
});
</script>

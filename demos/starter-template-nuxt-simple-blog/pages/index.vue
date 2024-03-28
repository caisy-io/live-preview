<template>
  <Page v-bind="props" />
  <CaisyConnectionIndicator />
</template>

<script setup>
import { EPageType, getProps } from "~~/services/content/getProps";
import Page from "~~/layouts/Page.vue";
import CaisyConnectionIndicator from "@nicolasshiken/live-preview-vue/caisyConnectionIndicator";
import { onMounted } from "vue";
import { caisyLivePreview } from "@nicolasshiken/live-preview-vue/caisyLivePreview";
import { getCaisyCookie } from "@nicolasshiken/live-preview-vue/getCaisyCookie";

let close = null;

onMounted(() => {
  close = caisyLivePreview({
    projectId: "322ad481-7595-4ad4-8c11-f30d9d81b0d3",
    token: getCaisyCookie(),
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

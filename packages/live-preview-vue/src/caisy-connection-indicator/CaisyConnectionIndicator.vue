<script setup lang="ts">
// import "@caisy/live-preview-javascript/connectionIndicator";
// import "@caisy/live-preview-javascript/inpsect";
import livePreviewJavascript from "@caisy/live-preview-javascript/test";
import { onMounted, onUnmounted } from "vue";

let connectionIndicator, observer;

onMounted(() => {
  const createdIndicator =
    livePreviewJavascript.createCaisyConnectionIndicator();
  console.log({ createdIndicator });
  connectionIndicator = createdIndicator.connectionIndicator;
  observer = createdIndicator.observer;
  document.body.append(connectionIndicator);
});

onUnmounted(() => {
  observer.disconnect();
  connectionIndicator.remove();
});
</script>

<template></template>

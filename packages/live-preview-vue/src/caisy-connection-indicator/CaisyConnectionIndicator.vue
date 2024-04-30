<script setup>
import "@nicolasshiken/live-preview-javascript/indicatorStyles";
import "@nicolasshiken/live-preview-javascript/styles";
import { createCaisyConnectionIndicator } from "@nicolasshiken/live-preview-javascript/createCaisyConnectionIndicator";
import { onMounted, onUnmounted } from "vue";

let connectionIndicator, observer;

onMounted(() => {
  const createdIndicator = createCaisyConnectionIndicator();
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

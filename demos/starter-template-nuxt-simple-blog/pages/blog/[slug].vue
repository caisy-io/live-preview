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
  </template>
</template>

<script setup>
import Layout from "~~/layouts/Layout.vue";
import { EPageType, getProps } from "~~/services/content/getProps";
import { caisyLivePreview } from "@nicolasshiken/live-preview-javascript/caisyLivePreview";
import { getCaisyCookie } from "@nicolasshiken/live-preview-vue/getCaisyCookie";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-vue/useCaisyUpdates";

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

const route = useRoute();
const { slug } = route.params;

const { data: props } = await useAsyncData(`blog ${slug}`, () =>
  getProps({ slug, pageType: EPageType.Blog })
);

const liveProps = useCaisyUpdates({ ...props._rawValue });

if (props.is404) navigateTo("/404");
</script>

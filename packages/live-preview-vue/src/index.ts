import { createPubSub } from "./pubsub";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import isEqual from "lodash/isEqual";
// import livePreviewJavascript from "@caisy/live-preview-javascript";
// import CaisyConnectionIndicatorInner from "./caisy-connection-indicator/CaisyConnectionIndicator.vue";
// import livePreviewJavascript from "@caisy/live-preview-javascript";
import { onMounted, ref, watch, reactive, onUnmounted } from "vue";

const globalRef =
  (typeof window !== "undefined" && (window as any).c) ||
  (typeof window !== "undefined" &&
    ((window as any)["c"] = {}) &&
    (window as any).c) ||
  ({} as any);

const globalStore = globalRef["preview"] || (globalRef["preview"] = {});

globalStore["subscribers"] = globalStore["subscribers"] || new Map();

if (!globalStore["pubsub"]) {
  globalStore["pubsub"] = createPubSub();
}

// export function useCaisyUpdates<T>(
//   originalData: T,
//   options?: { locale?: string; richtextV2?: boolean }
// ): T {
//   // const orgRef = ref(originalData);
//   const { locale } = options || {};

//   const activeLocale = ref(locale || globalStore["defaultlocale"] || "en");

//   const localeKey = ref(
//     activeLocale.value || locale || globalStore["defaultlocale"] || "en"
//   );

//   const state = ref({
//     data: { [localeKey.value]: cloneDeep(originalData) },
//     version: 0,
//   });

//   // watchEffect(() => {

//   console.log({ globalStore });

//   onMounted(() => {
//     console.log("mounted");
//     const onUpdate = (update: any, key: string | null) => {
//       const newState = {
//         data: { [localeKey.value]: { ...originalData } },
//         version: 0,
//       };

//       if (!newState.data[update.localeApiName]) {
//         newState.data[update.localeApiName] = cloneDeep(originalData);
//       }

//       if (update.fieldType === "richtext") {
//         const richtextKey = options?.richtextV2
//           ? `${key}.${update.fieldName}`
//           : `${key}.${update.fieldName}.json`;
//         set(newState.data[update.localeApiName], richtextKey, update.value);
//       } else if (update.fieldType === "connection") {
//         window.location.reload();
//       } else {
//         set(
//           newState.data[update.localeApiName],
//           `${key}.${update.fieldName}`,
//           update.value
//         );
//       }

//       state.value = { ...newState, version: state.value.version + 1 };
//     };

//     const recursivelySubscribeToComponents = (
//       data: any,
//       key: string | null
//     ) => {
//       if (typeof data !== "object") {
//         return;
//       }

//       const componentNames = Object.keys(data).filter((key) => {
//         return !!data[key]?.id || Array.isArray(data[key]);
//       });

//       console.log({ componentNames });

//       componentNames.forEach((componentName) => {
//         globalStore.pubsub.on(data[componentName].id, (update: any) =>
//           onUpdate(update, key ? `${key}.${componentName}` : `${componentName}`)
//         );
//       });

//       componentNames.forEach((componentName) => {
//         if (typeof data[componentName] === "object") {
//           recursivelySubscribeToComponents(
//             data[componentName],
//             key ? `${key}.${componentName}` : `${componentName}`
//           );
//         }
//       });
//     };

//     recursivelySubscribeToComponents(originalData, null);
//     // });
//   });

//   // onMounted(() => {
//   //   if (deepEqual(originalData, orgRef.value)) {
//   //     return;
//   //   }
//   //   orgRef.value = originalData;
//   //   state.value = {
//   //     data: {
//   //       [localeKey.value]: cloneDeep(originalData),
//   //     },
//   //     version: 0,
//   //   };
//   // });

//   //   watchEffect(() => {
//   //     if (locale) {
//   //       return;
//   //     }
//   //     const onLocaleChange = (newLocale) => {
//   //       activeLocale.value = newLocale;
//   //     };

//   //     globalStore.pubsub.on("localeChange", onLocaleChange);

//   //     return () => {
//   //       globalStore.pubsub.off("localeChange", onLocaleChange);
//   //     };
//   //   });

//   return state.value.data[localeKey.value] || originalData;
// }

export function useCaisyUpdates<T>(
  originalData: T,
  options?: { locale?: string; richtextV2?: boolean }
): T {
  const orgRef = { current: originalData };
  const { locale } = options || {};
  const activeLocale = ref(locale || globalStore.defaultlocale || "en");
  const localeKey = ref(
    activeLocale.value || locale || globalStore.defaultlocale || "en"
  );

  const state = reactive({
    data: { [localeKey.value]: cloneDeep(originalData) },
    version: 0,
  });

  const onUpdate = (update, key) => {
    const newState = {
      data: { [localeKey.value]: { ...originalData } },
      version: 0,
    };

    if (!newState.data[update.localeApiName]) {
      newState.data[update.localeApiName] = cloneDeep(originalData);
    }

    if (update.fieldType === "richtext") {
      const richtextKey = options.richtextV2
        ? `${key}.${update.fieldName}`
        : `${key}.${update.fieldName}.json`;
      set(newState.data[update.localeApiName], richtextKey, update.value);
    } else if (update.fieldType === "connection") {
      window.location.reload();
    } else {
      set(
        newState.data[update.localeApiName],
        `${key}.${update.fieldName}`,
        update.value
      );
    }

    state.data = { ...newState.data };
    state.version++;
  };

  const recursivelySubscribeToComponents = (data, key) => {
    if (typeof data !== "object") return;

    const componentNames = Object.keys(data).filter(
      (k) => data[k]?.id || Array.isArray(data[k])
    );

    componentNames.forEach((componentName) => {
      globalStore.pubsub.on(data[componentName].id, (update) =>
        onUpdate(update, key ? `${key}.${componentName}` : componentName)
      );
    });

    componentNames.forEach((componentName) => {
      if (typeof data[componentName] === "object") {
        recursivelySubscribeToComponents(
          data[componentName],
          key ? `${key}.${componentName}` : componentName
        );
      }
    });
  };

  const onLocaleChange = (newLocale) => {
    activeLocale.value = newLocale;
  };

  onMounted(() => {
    recursivelySubscribeToComponents(originalData, null);

    watch(
      () => originalData,
      (newOriginalData) => {
        if (isEqual(newOriginalData, orgRef.current)) return;
        orgRef.current = newOriginalData;
        state.data = {
          [localeKey.value]: cloneDeep(newOriginalData),
        };
        state.version = 0;
      },
      { deep: true }
    );

    if (!locale) {
      globalStore.pubsub.on("localeChange", onLocaleChange);
    }
  });

  onUnmounted(() => {
    globalStore.pubsub.off("localeChange", onLocaleChange);
  });

  return state.data[localeKey.value] || originalData;
}

// export const CaisyConnectionIndicator = CaisyConnectionIndicatorInner;
// export const caisyLivePreview = livePreviewJavascript.caisyLivePreview;
// export const getCaisyInspectProps = livePreviewJavascript.getCaisyInspectProps;
// export const getCaisyToken = livePreviewJavascript.getCaisyToken;

// export const CaisyConnectionIndicator = CaisyConnectionIndicatorInner;
// export const caisyLivePreview = livePreviewJavascript.caisyLivePreview;
// export const getCaisyInspectProps = livePreviewJavascript.getCaisyInspectProps;
// export const getCaisyToken = livePreviewJavascript.getCaisyToken;

const livePreviewVue = {
  useCaisyUpdates,
  // CaisyConnectionIndicator,
  // caisyLivePreview,
  // getCaisyInspectProps,
  // getCaisyToken,
};

export default livePreviewVue;

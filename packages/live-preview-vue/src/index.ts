import { createPubSub } from "./pubsub";
import cloneDeep from "lodash/cloneDeep";
import deepEqual from "deep-equal";
import set from "lodash/set";
export { caisyLivePreview } from "@nicolasshiken/live-preview-javascript/caisyLivePreview";
export { getCaisyInspectProps } from "@nicolasshiken/live-preview-javascript/getCaisyInspectProps";
export { getCaisyCookie } from "@nicolasshiken/live-preview-javascript/getCaisyCookie";
import { onMounted, ref } from "vue";

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

export function useCaisyUpdates<T>(
  originalData: T,
  options?: { locale?: string }
): T {
  // const orgRef = ref(originalData);
  const { locale } = options || {};

  const activeLocale = ref(locale || globalStore["defaultlocale"] || "en");

  const localeKey = ref(
    activeLocale.value || locale || globalStore["defaultlocale"] || "en"
  );

  const state = ref({
    data: { [localeKey.value]: cloneDeep(originalData) },
    version: 0,
  });

  // watchEffect(() => {
  // console.log("watchEffect: ", { originalData });
  onMounted(() => {
    const onUpdate = (update: any, key: string | null) => {
      console.log("udpate");
      const newState = {
        data: { [localeKey.value]: { ...originalData } },
        version: 0,
      };

      if (!newState.data[update.localeApiName]) {
        newState.data[update.localeApiName] = cloneDeep(originalData);
      }

      if (update.fieldType === "richtext") {
        set(
          newState.data[update.localeApiName],
          `${key}.${update.fieldName}.json`,
          update.value
        );
      } else if (update.fieldType === "connection") {
        window.location.reload();
      } else {
        set(
          newState.data[update.localeApiName],
          `${key}.${update.fieldName}`,
          update.value
        );
      }

      state.value = { ...newState, version: state.value.version + 1 };
    };

    const recursivelySubscribeToComponents = (
      data: any,
      key: string | null
    ) => {
      if (typeof data !== "object") {
        return;
      }

      const componentNames = Object.keys(data).filter((key) => {
        return !!data[key]?.id || Array.isArray(data[key]);
      });

      componentNames.forEach((componentName) => {
        globalStore.pubsub.on(data[componentName].id, (update: any) =>
          onUpdate(update, key ? `${key}.${componentName}` : `${componentName}`)
        );
      });

      componentNames.forEach((componentName) => {
        if (typeof data[componentName] === "object") {
          recursivelySubscribeToComponents(
            data[componentName],
            key ? `${key}.${componentName}` : `${componentName}`
          );
        }
      });
    };

    recursivelySubscribeToComponents(originalData, null);
    // });
  });

  // onMounted(() => {
  //   if (deepEqual(originalData, orgRef.value)) {
  //     return;
  //   }
  //   orgRef.value = originalData;
  //   state.value = {
  //     data: {
  //       [localeKey.value]: cloneDeep(originalData),
  //     },
  //     version: 0,
  //   };
  // });

  //   watchEffect(() => {
  //     if (locale) {
  //       return;
  //     }
  //     const onLocaleChange = (newLocale) => {
  //       activeLocale.value = newLocale;
  //     };

  //     globalStore.pubsub.on("localeChange", onLocaleChange);

  //     return () => {
  //       globalStore.pubsub.off("localeChange", onLocaleChange);
  //     };
  //   });

  return state.value.data[localeKey.value] || originalData;
}

// export function useCaisyUpdates<T>(
//   originalData: T,
//   options?: { locale?: string }
// ): T {
//   const orgRef = useRef(originalData);
//   const { locale } = options || {};

//   const [activeLocale, setActiveLocale] = useState(
//     locale || globalStore["defaultlocale"] || "en"
//   );

//   const localeKey =
//     activeLocale || locale || globalStore["defaultlocale"] || "en";

//   const [state, setState] = useState({
//     data: { [localeKey]: cloneDeep(originalData) },
//     version: 0,
//   });

//   useEffect(() => {
//     const onUpdate = (update, key) => {
//       const newState = {
//         data: { [localeKey]: { ...originalData } },
//         version: 0,
//       };

//       if (!newState.data[update.localeApiName]) {
//         newState.data[update.localeApiName] = cloneDeep(originalData);
//       }

//       if (update.fieldType === "richtext") {
//         set(
//           newState.data[update.localeApiName],
//           `${key}.${update.fieldName}.json`,
//           update.value
//         );
//       } else if (update.fieldType === "connection") {
//         window.location.reload();
//       } else {
//         set(
//           newState.data[update.localeApiName],
//           `${key}.${update.fieldName}`,
//           update.value
//         );
//       }

//       setState({ ...newState, version: state.version + 1 });
//     };

//     const recursivelySubscribeToComponents = (data, key) => {
//       if (typeof data !== "object") {
//         return;
//       }

//       const componentNames = Object.keys(data).filter((key) => {
//         return !!data[key]?.id || Array.isArray(data[key]);
//       });

//       componentNames.forEach((componentName) => {
//         globalStore.pubsub.on(data[componentName].id, (update) =>
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
//   }, [originalData]);

//   useEffect(() => {
//     if (deepEqual(originalData, orgRef.current)) {
//       return;
//     }
//     orgRef.current = originalData;
//     setState({
//       data: {
//         [localeKey]: cloneDeep(originalData),
//       },
//       version: 0,
//     });
//   }, [localeKey, originalData]);

//   useEffect(() => {
//     if (locale) {
//       return;
//     }
//     const onLocaleChange = (newLocale) => {
//       setActiveLocale(newLocale);
//     };

//     globalStore.pubsub.on("localeChange", onLocaleChange);

//     return () => {
//       globalStore.pubsub.off("localeChange", onLocaleChange);
//     };
//   }, [locale]);

//   return state.data[localeKey] || originalData;
// }

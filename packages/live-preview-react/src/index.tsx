import { createPubSub } from "./pubsub";
import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import deepEqual from "deep-equal";
export { caisyLivePreview } from "@nicolasshiken/live-preview-javascript/caisyLivePreview";
export { getCaisyInspectProps } from "@nicolasshiken/live-preview-javascript/getCaisyInspectProps";
export { getCaisyCookie } from "@nicolasshiken/live-preview-javascript/getCaisyCookie";

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
  const orgRef = useRef(originalData);
  const { locale } = options || {};
  const id = (originalData as any)?.id;

  const [activeLocale, setActiveLocale] = useState(
    locale || globalStore["defaultlocale"] || "en"
  );

  const localeKey =
    activeLocale || locale || globalStore["defaultlocale"] || "en";

  const [state, setState] = useState({
    data: { [localeKey]: cloneDeep(originalData) },
    version: 0,
  });

  useEffect(() => {
    // search for id
    // search for __typename
    // const typename = (originalData as any)?.__typename;
    // console.log(` id`, id);
    // console.log(` typename`, typename);
    // const key = `${typename}!${id}`;
    if (!id) return;
    let t: any = null;

    const onUpdate = (update) => {
      setState((prev) => {
        if (!prev.data[update.localeApiName]) {
          prev.data[update.localeApiName] = cloneDeep(originalData);
        }

        if (update.fieldType === "richtext") {
          prev.data[update.localeApiName][update.fieldName] = {
            json: update.value,
          };
        } else if (update.fieldType === "connection") {
          t = setTimeout(() => {
            window.location.reload();
          }, 200);
        } else {
          prev.data[update.localeApiName][update.fieldName] = update.value;
        }

        return { data: prev.data, version: state.version + 1 };
      });
    };

    globalStore.pubsub.on(id, onUpdate);

    return () => {
      t && clearTimeout(t);
      globalStore.pubsub.off(id, onUpdate);
    };
  }, []);

  useEffect(() => {
    if (deepEqual(originalData, orgRef.current)) {
      return;
    }
    orgRef.current = originalData;
    setState({
      data: {
        [localeKey]: cloneDeep(originalData),
      },
      version: 0,
    });
  }, [localeKey, originalData]);

  useEffect(() => {
    if (locale) {
      return;
    }
    const onLocaleChange = (newLocale) => {
      setActiveLocale(newLocale);
    };

    globalStore.pubsub.on("localeChange", onLocaleChange);

    return () => {
      globalStore.pubsub.off("localeChange", onLocaleChange);
    };
  }, [locale]);

  return state.data[localeKey] || originalData;
}

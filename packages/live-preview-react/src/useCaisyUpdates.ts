import React from "react";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import set from "lodash/set";
import createPubSub from "./pubsub";
const { useRef, useEffect, useState } = React;

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
  options?: { locale?: string; richtextV2?: boolean },
  onUpdateOverwrite?: {
    "connection": (event: {update: any, key:string}) => void,
    "file": (event: {update: any, key:string}) => void
  }
): T {
  const orgRef = useRef(originalData);
  const { locale } = options || {};

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
    const onUpdate = (update, key) => {
      const newState = {
        data: { [localeKey]: { ...originalData } },
        version: 0,
      };

      if (!newState.data[update.localeApiName]) {
        newState.data[update.localeApiName] = cloneDeep(originalData);
      }

      if (update.fieldType === "richtext") {
        const richtextKey = options?.richtextV2
          ? `${key}.${update.fieldName}`
          : `${key}.${update.fieldName}.json`;
        set(newState.data[update.localeApiName], richtextKey, update.value);
      } else if (
        update.fieldType === "connection" ||
        update.fieldType === "file"
      ) {
        if (onUpdateOverwrite && onUpdateOverwrite[update.fieldType]) {
          onUpdateOverwrite[update.fieldType]({update, key});
        }else {
          window.location.reload();
        }
      } else {
        set(
          newState.data[update.localeApiName],
          `${key}.${update.fieldName}`,
          update.value
        );
      }

      setState({ ...newState, version: state.version + 1 });
    };

    const recursivelySubscribeToComponents = (data, key) => {
      if (typeof data !== "object") {
        return;
      }

      const componentNames = Object.keys(data).filter((key) => {
        return !!data[key]?.id || Array.isArray(data[key]);
      });

      componentNames.forEach((componentName) => {
        globalStore.pubsub.on(data[componentName].id, (update) =>
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
  }, [originalData]);

  // useEffect(() => {
  //   // search for id
  //   // search for __typename
  //   // const typename = (originalData as any)?.__typename;
  //   // console.log(` id`, id);
  //   // console.log(` typename`, typename);
  //   // const key = `${typename}!${id}`;
  //   if (!id) return;
  //   let t: any = null;

  //   const onUpdate = (update) => {
  //     setState((prev) => {
  //       if (!prev.data[update.localeApiName]) {
  //         prev.data[update.localeApiName] = cloneDeep(originalData);
  //       }

  //       if (update.fieldType === "richtext") {
  //         prev.data[update.localeApiName][update.fieldName] = {
  //           json: update.value,
  //         };
  //       } else if (update.fieldType === "connection") {
  //         t = setTimeout(() => {
  //           window.location.reload();
  //         }, 200);
  //       } else {
  //         prev.data[update.localeApiName][update.fieldName] = update.value;
  //       }

  //       return { data: prev.data, version: state.version + 1 };
  //     });
  //   };

  //   globalStore.pubsub.on(id, onUpdate);

  //   return () => {
  //     t && clearTimeout(t);
  //     globalStore.pubsub.off(id, onUpdate);
  //   };
  // }, []);

  useEffect(() => {
    if (isEqual(originalData, orgRef.current)) {
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

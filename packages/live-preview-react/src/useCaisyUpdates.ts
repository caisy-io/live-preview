import React from "react";
import { isEqual, set } from "./helper";
import { globalStore } from "./globalStore";

const { useRef, useEffect, useState } = React;

function getAllConnectedIds(data: any) {
  const allIds: string[] = [];

  data?.content?.forEach((block: any) => {
    if (block?.type == "documentLink" && block.attrs?.documentId) {
      allIds.push(block.attrs.documentId);
    }
  });

  return allIds;
}

function get(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function useCaisyUpdates<T>(
  originalData: T,
  options?: { locale?: string; richtextV2?: boolean },
  onUpdateOverwrite?: {
    connection: (event: { update: any; key: string }) => void;
    file: (event: { update: any; key: string }) => void;
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
    data: { [localeKey]: structuredClone(originalData) },
    version: 0,
  });

  useEffect(() => {
    const onUpdate = (update, key) => {
      const newState = {
        data: { [localeKey]: { ...originalData } },
        version: 0,
      };

      if (!newState.data[update.localeApiName]) {
        newState.data[update.localeApiName] = structuredClone(originalData);
      }

      if (update.fieldType === "richtext") {
        const richtextKey = options?.richtextV2
          ? `${key}.${update.fieldName}`
          : `${key}.${update.fieldName}.json`;

        if (options?.richtextV2) {
          set(newState.data[update.localeApiName], richtextKey, update.value);
          return;
        }
        // richtextV3+ implementation
        let dataBefore: any = undefined;
        const curretObject = get(
          newState.data[update.localeApiName],
          richtextKey
        );

        if (curretObject) {
          const currentConnectionIds = getAllConnectedIds(curretObject);
          dataBefore = currentConnectionIds;
        }

        const allConnectedIds = getAllConnectedIds(update.value);

        if (
          dataBefore != undefined &&
          dataBefore.length !== allConnectedIds.length
        ) {
          if (onUpdateOverwrite && onUpdateOverwrite[update.fieldType]) {
            onUpdateOverwrite[update.fieldType]({ update, key: richtextKey });
          } else {
            window.location.reload();
          }
          return;
        }

        set(newState.data[update.localeApiName], richtextKey, update.value);
      } else if (
        update.fieldType === "connection" ||
        update.fieldType === "file"
      ) {
        if (onUpdateOverwrite && onUpdateOverwrite[update.fieldType]) {
          onUpdateOverwrite[update.fieldType]({ update, key });
        } else {
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
          // detect richtext connections exist and subscribe to them
          Object.keys(data[componentName]).forEach((nextedKey) => {
            if (
              data[componentName][nextedKey]?.connections &&
              Array.isArray(data[componentName][nextedKey].connections)
            ) {
              recursivelySubscribeToComponents(
                data[componentName][nextedKey].connections,
                `${key}.${componentName}.${nextedKey}.connections`
              );
            }
          });

          recursivelySubscribeToComponents(
            data[componentName],
            key ? `${key}.${componentName}` : `${componentName}`
          );
        }
      });
    };

    recursivelySubscribeToComponents(originalData, null);
  }, [originalData]);

  useEffect(() => {
    if (isEqual(originalData, orgRef.current)) {
      return;
    }
    orgRef.current = originalData;
    setState({
      data: {
        [localeKey]: structuredClone(originalData),
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

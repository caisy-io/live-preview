import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { globalStore } from "../javascript/globalstore";
import { set } from "../helper";

export function useCaisyUpdates<T>(originalData: T, options?: { locale?: string; richtextV2?: boolean }) {
    const { locale } = options || {};

    const activeLocale = useSignal(locale || globalStore["defaultlocale"] || "en");

    const localeKey = activeLocale.value || locale || globalStore["defaultlocale"] || "en";

    const state = useSignal({
        data: { [localeKey]: structuredClone(originalData) },
        version: 0,
    });
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        const onUpdate = $((update: any, key: string) => {
            const newState: any = {
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
                set(newState.data[update.localeApiName], richtextKey, update.value);
            } else if (update.fieldType === "connection" || update.fieldType === "file") {
                window.location.reload();
            } else {
                set(newState.data[update.localeApiName], `${key}.${update.fieldName}`, update.value);
            }

            state.value = structuredClone({ ...newState, version: state.value.version + 1 });
        });

        const recursivelySubscribeToComponents = (data: any, key: string | null) => {
            if (typeof data !== "object") {
                return;
            }

            const componentNames = Object.keys(data).filter((key) => {
                return !!data[key]?.id || Array.isArray(data[key]);
            });

            componentNames.forEach((componentName) => {
                data[componentName].id &&
                    globalStore.pubsub.on(data[componentName].id, (update: any) => {
                        return onUpdate(update, key ? `${key}.${componentName}` : `${componentName}`);
                    });
            });

            componentNames.forEach((componentName) => {
                if (typeof data[componentName] === "object") {
                    recursivelySubscribeToComponents(
                        data[componentName],
                        key ? `${key}.${componentName}` : `${componentName}`,
                    );
                }
            });
        };

        recursivelySubscribeToComponents(originalData, null);

        if (!locale) {
            const onLocaleChange = $((newLocale: string) => {
                activeLocale.value = newLocale;
            });

            globalStore.pubsub.on("localeChange", onLocaleChange);

            return () => {
                globalStore.pubsub.off("localeChange", onLocaleChange);
            };
        }
    });
    // eslint-disable-next-line qwik/no-use-visible-task
    // useVisibleTask$(({ track }) => {
    //     track(() => originalData);
    //     if (isEqual(originalData, orgRef.value)) {
    //         return;
    //     }
    //     orgRef.value = originalData;
    //     state.value = {
    //         data: {
    //             [localeKey]: cloneDeep(originalData),
    //         },
    //         version: 0,
    //     };
    // });

    // console.log(` state.value.data[localeKey]`, state.value.data[localeKey]);
    // return state.value.data[localeKey] || originalData;
    return state;
}

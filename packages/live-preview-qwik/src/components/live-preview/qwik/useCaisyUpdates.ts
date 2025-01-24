import { $, Signal, useComputed$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { globalStore } from "../javascript/globalstore";
import { get, set } from "../helper";

const getAllConnectedIds = (data: any) => {
    const allIds: string[] = [];

    data?.content?.forEach((block: any) => {
        if (block?.type == "documentLink" && block.attrs?.documentId) {
            allIds.push(block.attrs.documentId);
        }
    });

    return allIds;
};

export function useCaisyUpdates<T>(
    originalData: T,
    options?: { locale?: string; richtextV2?: boolean },
): { liveProps: Signal<Awaited<T>>; version: Signal<Awaited<number>> } {
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

                if (options?.richtextV2) {
                    set(newState.data[update.localeApiName], richtextKey, update.value);
                } else {
                    let dataBefore: any = undefined;
                    const curretObject = get(newState.data[update.localeApiName], richtextKey);
                    if (curretObject) {
                        const currentConnectionIds = getAllConnectedIds(curretObject);
                        dataBefore = currentConnectionIds;
                    }

                    const allConnectedIds = getAllConnectedIds(update.value);

                    if (dataBefore != undefined && dataBefore.length !== allConnectedIds.length) {
                        window.location.reload();
                        return;
                    }

                    set(newState.data[update.localeApiName], richtextKey, update.value);
                }
            } else if (update.fieldType === "connection" || update.fieldType === "file") {
                window.location.reload();
                return;
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
                    // detect richtext connections exist and subscribe to them
                    Object.keys(data[componentName]).forEach((nextedKey) => {
                        if (
                            data[componentName][nextedKey]?.connections &&
                            Array.isArray(data[componentName][nextedKey].connections)
                        ) {
                            recursivelySubscribeToComponents(
                                data[componentName][nextedKey].connections,
                                `${key}.${componentName}.${nextedKey}.connections`,
                            );
                        }
                    });

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

    const updatedDataByLocale = useComputed$(() => state.value.data[localeKey]);
    const versionSig = useComputed$(() => state.value.version);
    return { liveProps: updatedDataByLocale, version: versionSig };
}
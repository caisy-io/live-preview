import { createPubSub } from "./pubsub";
import { useEffect, useRef, useState } from "react";
import { startInspectMode } from "./inspect";
import cloneDeep from "lodash/cloneDeep";
import { startCollaborationConnection } from "./collaboration/collaborationConnection";
import deepEqual from "deep-equal";

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

  // search for id
  // search for __typename
  // const typename = (originalData as any)?.__typename;
  // console.log(` id`, id);
  // console.log(` typename`, typename);
  // const key = `${typename}!${id}`;

  useEffect(() => {
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

export const getInspectProps = ({
  id,
  fieldName,
  disabled,
}: {
  id: string;
  fieldName: string;
  disabled?: boolean;
}) => {
  if (disabled) {
    return {};
  }

  return {
    "data-caisy-document-id": id,
    "data-caisy-field-name": fieldName,
  };
};

export const getCaisyInspectProps = getInspectProps;

export interface ILivePreviewSettings {
  projectId: string;
  token: string;
  locale?: string;
  inspectMode?: boolean;
  debug?: boolean;
  namespace?: string;
  enabled?: boolean;
}

export const init = (settings: ILivePreviewSettings) => {
  if (typeof window !== "undefined") {
    const locale = settings.locale || "en";
    if (globalRef) {
      globalRef.debug = settings.debug;
    }

    if (globalStore["defaultlocale"]) {
      globalStore["defaultlocale"] = locale;
      globalStore.pubsub.emit("localeChange", [locale]);
    } else {
      globalStore["defaultlocale"] = locale;
    }

    const inpsectMode =
      settings.enabled && (settings.inspectMode === false ? false : true);

    window.document.body.setAttribute(
      "data-caisy-inspect-mode",
      `${inpsectMode}`
    );

    if (inpsectMode && settings.enabled) {
      const cleanUpCollab = startCollaborationConnection({
        projectId: settings.projectId,
        token: settings.token,
      });
      const closeInspectMode = startInspectMode({
        locale,
        projectId: settings.projectId,
      });
      return () => {
        closeInspectMode();
        cleanUpCollab?.();
      };
    }

    return () => {};
    // const sdk = getSdk(
    //   getRequester({
    //     token: settings.token,
    //     endpoint: process.env.NEXT_PUBLIC_CORE_URL,
    //   })
    // );
    // const [localesRes, blueprintRes] = await Promise.all([
    //   sdk.GetAllDocumentFieldLocale({
    //     input: {
    //       projectId: settings.projectId,
    //     },
    //   }),
    //   sdk.GetManyBlueprints({
    //     input: {
    //       projectId: settings.projectId,
    //     },
    //   }),
    // ]);
    // console.log(
    //   ` localesRes`,
    //   localesRes.GetAllDocumentFieldLocale.documentFieldLocales
    // );
    // console.log(
    //   ` blueprintRes`,
    //   blueprintRes.GetManyBlueprints.connection.edges.map((e) => e.node)
    // );
    // globalStore.locales =
    //   localesRes.GetAllDocumentFieldLocale.documentFieldLocales;
    // globalStore.blueprints = blueprintRes.GetManyBlueprints.connection.edges.map(
    //   (e) => ({
    //     name: e.node.name,
    //     title: e.node.title,
    //     blueprintId: e.node.blueprintId,
    //     fields: e.node?.groups?.flatMap((g) => g?.fields).filter((f) => !!f),
    //   })
    // );
    // const key = `hfu_${projectId}${documentId}${field.blueprintFieldId}`;

    // const changeHandler = ({ documentFieldLocaleId, data }) => {
    //   // here we handle the events from peers that change that edit the same field - here we skip writing to the zustand store to avoid rerenders on every keystroke of the full document
    //   // with this approach only the single field that is changed should rerender on peer changes
    //   console.log(`changeHandler documentFieldLocaleId`, documentFieldLocaleId);
    //   console.log(`changeHandler data`, data);
    // };

    // window.c.collaboration.pubsub.on(key, changeHandler);

    // console.log(` globalStore["subscribers"]`, globalStore["subscribers"]);
    // console.log(` window.c.collaboration.pubsub`, window.c.collaboration.pubsub);
  }
};

/* 
To utilize the inspection feature, you must label fields by incorporating the live preview data-attributes (data-caisy-document-id, data-caisy-field-name) into the displayed HTML element result.

<h1 {...getInspectProps({ id, fieldName: 'title' })}>
  {title}
</h1>

*/

/* 
edge cases:
- two projects are beeing fetched in one frontend -> overwrite globale variable name,project id and token
- switching locales in the frontend -> overwrite globale variable locale and replace content
*/

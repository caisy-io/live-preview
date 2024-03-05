import { decodeAnyJSONMessage } from "../encoding";

export const handlePreviewFieldUpdate = (data: Uint8Array) => {
  const update = decodeAnyJSONMessage(data);

  if (window.c.debug) {
    console.log(`handlePreviewFieldUpdate update:`, update);
  }
  window.c.preview.pubsub.emit(update.documentId, [update]);
};

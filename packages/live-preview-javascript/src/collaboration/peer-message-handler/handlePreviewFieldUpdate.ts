import { decodeAnyJSONMessage } from "../encoding";

export const handlePreviewFieldUpdate = (data: Uint8Array) => {
  const update = decodeAnyJSONMessage(data);

  window.c.preview.pubsub.emit(update.documentId, [update]);
};

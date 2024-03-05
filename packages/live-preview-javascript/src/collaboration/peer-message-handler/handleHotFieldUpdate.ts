import { decodeHotFieldUpdate } from "../encoding";
import { ICollaborationState } from "../types";

export const handleHotFieldUpdate = (state: ICollaborationState, data) => {
  const msg = decodeHotFieldUpdate(data);
  const { documentFieldLocaleId, metaKey } = msg;
  state.pubsub.emit("hfu_" + metaKey, [{ data: msg.data, documentFieldLocaleId }]);
};

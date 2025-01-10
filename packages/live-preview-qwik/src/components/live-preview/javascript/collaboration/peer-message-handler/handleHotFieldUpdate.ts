import { decodeHotFieldUpdate } from "../encoding";
import type { ICollaborationState } from "../types";

export const handleHotFieldUpdate = (state: ICollaborationState, data: any) => {
    const msg = decodeHotFieldUpdate(data);
    const { documentFieldLocaleId, metaKey } = msg;
    state.pubsub.emit("hfu_" + metaKey, [{ data: msg.data, documentFieldLocaleId }]);
};

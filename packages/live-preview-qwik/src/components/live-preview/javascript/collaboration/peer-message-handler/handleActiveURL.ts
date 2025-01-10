import { PUBSUB_KEY_ACTIVE_URL_CHANGE } from "../constants";
import { decodeAnyJSONMessage } from "../encoding";
import type { ICollaborationState, IPeer } from "../types";

export const handleActiveURL = (state: ICollaborationState, peer: IPeer, data: Uint8Array) => {
    const msg = decodeAnyJSONMessage(data);
    state.peerLocations[peer.clientId] = msg;
    state.pubsub.emit(PUBSUB_KEY_ACTIVE_URL_CHANGE, []);
};

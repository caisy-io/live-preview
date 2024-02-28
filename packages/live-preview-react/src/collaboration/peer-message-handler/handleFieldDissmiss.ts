import { decodeFieldMessage } from "../encoding";
import { ICollaborationState, IPeer } from "../types";
import { findOwnListeningField } from "./helper";

export const handleFieldDissmiss = (
  state: ICollaborationState,
  peer: IPeer,
  data: Uint8Array
) => {
  const field = decodeFieldMessage(data);
  const ownListeningField = findOwnListeningField(state, field);
  if (!ownListeningField) {
    return;
  }

  ownListeningField.peersDismissed[peer.clientId] = true;

  if (
    state.peers.length &&
    state.peers.length <= Object.keys(ownListeningField.peersDismissed).length
  ) {
    console.log(
      `i have ${state.peers.length} peers but no one is intrested in this field so i assingen myself to leader `
    );
    ownListeningField.provider.setLeaderClientId(state.ownClientId, true);
    ownListeningField.provider.setSynced(true);
    ownListeningField.provider.emit("synced", [{ synced: true }]);
  }
};

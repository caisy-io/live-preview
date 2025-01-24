import { globalStore } from "../../globalstore";
import { PUBSUB_KEY_DOCUMENT_ACTIVE_CHANGE } from "../constants";
import { decodeAnyJSONMessage } from "../encoding";
import { clientIsPreviewRole } from "../helper";
import { getDocumentKey } from "../keys";
import type { ICollaborationState, IPeer } from "../types";

export const handleActiveDocumentChange = (
  state: ICollaborationState,
  peer: IPeer,
  data: Uint8Array
) => {
  const update = decodeAnyJSONMessage(data);

  const valueBefore = state.documentCollaborator[peer.clientId] ?? [];
  const newValue = update;

  // all documents that are not in both arrays are broadcasted to pubsub as changed
  const diff = valueBefore
    .filter((x) => !newValue.includes(x))
    .concat(newValue.filter((x: any) => !valueBefore.includes(x)));

  state.documentCollaborator[peer.clientId] = update;

  diff.forEach((documentId) => {
    state.pubsub.emit(
      getDocumentKey({ type: PUBSUB_KEY_DOCUMENT_ACTIVE_CHANGE, documentId }),
      []
    );
  });

  const sameUserEditorPeers =
    peer.clientId !== window.c.collaboration?.ownClientId &&
    !clientIsPreviewRole(peer.clientId) && // exclude preview role
    peer.clientId.slice(0, 38) ==
      window.c.collaboration?.ownClientId?.slice(0, 38);
  console.log(
    ` handleActiveDocumentChange sameUserEditorPeers=`,
    sameUserEditorPeers
  );
  
  if (sameUserEditorPeers) {
    globalStore.pubsub.emit("sameUserActiveDocumentChange", [update]);
  }
};

import {
  PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE,
  PEER_MESSAGE_TYPE_ACTIVE_URL,
  PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON,
  PEER_MESSAGE_TYPE_FIELD_DISSMISS,
  PEER_MESSAGE_TYPE_FIELD_INACTIVE_ON,
  PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON,
  PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON,
  PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE,
  PEER_MESSAGE_TYPE_PEER_MUTATION,
  PEER_MESSAGE_TYPE_PREVIEW_FIELD_UPDATE,
} from "./constants";
import { ICollaborationState, IPeer } from "./types";
import { handleFieldActiveOn } from "./peer-message-handler/handleFieldActiveOn";
import { handleFieldInactiveOn } from "./peer-message-handler/handleFieldInactiveOn";
import { handleHotFieldUpdate } from "./peer-message-handler/handleHotFieldUpdate";
import { handleFieldUnsubscribeOn } from "./peer-message-handler/handleFieldUnsubscribeOn";
import { handleActiveDocumentChange } from "./peer-message-handler/handleActiveDocumentChange";
import { handleActiveURL } from "./peer-message-handler/handleActiveURL";
import { handlePeerMutation } from "./peer-message-handler/handlePeerMutation";
import { handleFieldDissmiss } from "./peer-message-handler/handleFieldDissmiss";
import { handlePreviewFieldUpdate } from "./peer-message-handler/handlePreviewFieldUpdate";

const PEER_MESSAGE_TYPE_MAP = {
  [PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON]: "Field Subscribe On",
  [PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON]: "Field Unsubscribe On",
  [PEER_MESSAGE_TYPE_FIELD_DISSMISS]: "Field Dismiss",
  [PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON]: "Field Active On",
  [PEER_MESSAGE_TYPE_FIELD_INACTIVE_ON]: "Field Inactive On",
  [PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE]: "Active Document Change",
  [PEER_MESSAGE_TYPE_ACTIVE_URL]: "Active URL",
  [PEER_MESSAGE_TYPE_PEER_MUTATION]: "Peer Mutation",
};

export const onPeerMessage = (
  state: ICollaborationState,
  peer: IPeer,
  data: Uint8Array,
  hasDelay = false
) => {
  const peerMessageType = data[0];

  // some fake delay
  // debug only
  if (state.ownClientId > peer.clientId && !hasDelay) {
    setTimeout(() => {
      onPeerMessage(state, peer, data, true);
    }, 100);
    return;
  }

  // debug only
  // @ts-ignore
  window.c.collaboration.incoming_callstack =
    // @ts-ignore
    window.c.collaboration.incoming_callstack || [];
  PEER_MESSAGE_TYPE_MAP[peerMessageType] &&
    // @ts-ignore
    window.c.collaboration.incoming_callstack.push(
      PEER_MESSAGE_TYPE_MAP[peerMessageType]
    );

  switch (peerMessageType) {
    case PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON:
      handleFieldUnsubscribeOn(state, peer, data);
      break;
    case PEER_MESSAGE_TYPE_FIELD_DISSMISS:
      handleFieldDissmiss(state, peer, data);
      break;
    case PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON:
      handleFieldActiveOn(state, peer, data);
      break;
    case PEER_MESSAGE_TYPE_FIELD_INACTIVE_ON:
      handleFieldInactiveOn(state, peer, data);
      break;
    case PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE:
      handleActiveDocumentChange(state, peer, data);
      break;
    case PEER_MESSAGE_TYPE_ACTIVE_URL:
      handleActiveURL(state, peer, data);
      break;
    case PEER_MESSAGE_TYPE_PEER_MUTATION:
      handlePeerMutation(data);
      break;
    case PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE:
      handleHotFieldUpdate(state, data);
      break;
    case PEER_MESSAGE_TYPE_PREVIEW_FIELD_UPDATE:
      handlePreviewFieldUpdate(data);
      break;
    default:
      console.log("Unknown peer message type:", peerMessageType);
      break;
  }
};

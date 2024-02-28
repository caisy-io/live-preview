export const PEER_MESSAGE_TYPE_MESSAGE_SYNC_UPDATE = 1;
export const PEER_MESSAGE_TYPE_AWARENESS = 2;
export const PEER_MESSAGE_TYPE_FIELD_DISSMISS = 3; // peer knows that other peer is not intrested in this field
export const PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON = 4; // Declare that peer is intrested in this field
export const PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON = 5; // Declare that peer is not intrested anymore in this field
export const PEER_MESSAGE_TYPE_MESSAGE_SYNC_REQUEST = 6;
export const PEER_MESSAGE_TYPE_MESSAGE_SYNC_ACKNOWLEDGEMENT = 7;
export const PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE = 8; // User changed the active document(s)
export const PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON = 9; // Field peer is active on
export const PEER_MESSAGE_TYPE_FIELD_INACTIVE_ON = 10; // Field peer is not active anymore
export const PEER_MESSAGE_TYPE_ACTIVE_URL = 11; // perr is on this Active URL right now
export const PEER_MESSAGE_TYPE_PEER_MUTATION = 12; // when ever there are changes in the store, like update document we share it with other peers (not all events implemented yet)
export const PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE = 13; // since the value of fields can change very often we send this on a seperate channel
export const PEER_MESSAGE_TYPE_PREVIEW_FIELD_UPDATE = 14;
export const PEER_MESSAGE_TYPE_PREVIEW_FIELD_ACTIVE = 15;

// pubsub only used internally not peer2peer or webhocket
export const PUBSUB_KEY_PREVIEW_FIELD_UPDATE = "pfu";
export const PUBSUB_KEY_CONNECTION = "conn";
export const PUBSUB_KEY_DOCUMENT_ACTIVE_CHANGE = "dac";
export const PUBSUB_KEY_ACTIVE_URL_CHANGE = "auc";

// used for websocket
export enum INCOMING_SOCKET_MESSAGE_TYPE {
  SIGNAL = "signal",
  CHANGE = "change",
  ASSIGNMENT = "assignment",
  PEER_MESSAGE = "peer",
}
export enum OUTGOING_SOCKET_MESSAGE_TYPE {
  SWITCH = "switch",
  SIGNAL = "signal",
  PEER_MESSAGE = "peer",
}

// broadcast message types
export const BROADCASTCHANNEL_MESSAGE_TYPE_INIT = 41;
export const BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE = 42;
export const BROADCASTCHANNEL_MESSAGE_TYPE_PEER_PING = 43;

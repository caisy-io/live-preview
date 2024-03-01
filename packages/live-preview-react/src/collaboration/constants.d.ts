export declare const PEER_MESSAGE_TYPE_MESSAGE_SYNC_UPDATE = 1;
export declare const PEER_MESSAGE_TYPE_AWARENESS = 2;
export declare const PEER_MESSAGE_TYPE_FIELD_DISSMISS = 3;
export declare const PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON = 4;
export declare const PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON = 5;
export declare const PEER_MESSAGE_TYPE_MESSAGE_SYNC_REQUEST = 6;
export declare const PEER_MESSAGE_TYPE_MESSAGE_SYNC_ACKNOWLEDGEMENT = 7;
export declare const PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE = 8;
export declare const PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON = 9;
export declare const PEER_MESSAGE_TYPE_FIELD_INACTIVE_ON = 10;
export declare const PEER_MESSAGE_TYPE_ACTIVE_URL = 11;
export declare const PEER_MESSAGE_TYPE_PEER_MUTATION = 12;
export declare const PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE = 13;
export declare const PEER_MESSAGE_TYPE_PREVIEW_FIELD_UPDATE = 14;
export declare const PEER_MESSAGE_TYPE_PREVIEW_FIELD_ACTIVE = 15;
export declare const PUBSUB_KEY_PREVIEW_FIELD_UPDATE = "pfu";
export declare const PUBSUB_KEY_CONNECTION = "conn";
export declare const PUBSUB_KEY_DOCUMENT_ACTIVE_CHANGE = "dac";
export declare const PUBSUB_KEY_ACTIVE_URL_CHANGE = "auc";
export declare enum INCOMING_SOCKET_MESSAGE_TYPE {
    SIGNAL = "signal",
    CHANGE = "change",
    ASSIGNMENT = "assignment",
    PEER_MESSAGE = "peer"
}
export declare enum OUTGOING_SOCKET_MESSAGE_TYPE {
    SWITCH = "switch",
    SIGNAL = "signal",
    PEER_MESSAGE = "peer"
}
export declare const BROADCASTCHANNEL_MESSAGE_TYPE_INIT = 41;
export declare const BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE = 42;
export declare const BROADCASTCHANNEL_MESSAGE_TYPE_PEER_PING = 43;
//# sourceMappingURL=constants.d.ts.map
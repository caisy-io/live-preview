"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPeerMessage = void 0;
const constants_1 = require("./constants");
const handleFieldActiveOn_1 = require("./peer-message-handler/handleFieldActiveOn");
const handleFieldInactiveOn_1 = require("./peer-message-handler/handleFieldInactiveOn");
const handleHotFieldUpdate_1 = require("./peer-message-handler/handleHotFieldUpdate");
const handleFieldUnsubscribeOn_1 = require("./peer-message-handler/handleFieldUnsubscribeOn");
const handleActiveDocumentChange_1 = require("./peer-message-handler/handleActiveDocumentChange");
const handleActiveURL_1 = require("./peer-message-handler/handleActiveURL");
const handlePeerMutation_1 = require("./peer-message-handler/handlePeerMutation");
const handleFieldDissmiss_1 = require("./peer-message-handler/handleFieldDissmiss");
const handlePreviewFieldUpdate_1 = require("./peer-message-handler/handlePreviewFieldUpdate");
const PEER_MESSAGE_TYPE_MAP = {
    [constants_1.PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON]: "Field Subscribe On",
    [constants_1.PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON]: "Field Unsubscribe On",
    [constants_1.PEER_MESSAGE_TYPE_FIELD_DISSMISS]: "Field Dismiss",
    [constants_1.PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON]: "Field Active On",
    [constants_1.PEER_MESSAGE_TYPE_FIELD_INACTIVE_ON]: "Field Inactive On",
    [constants_1.PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE]: "Active Document Change",
    [constants_1.PEER_MESSAGE_TYPE_ACTIVE_URL]: "Active URL",
    [constants_1.PEER_MESSAGE_TYPE_PEER_MUTATION]: "Peer Mutation",
};
const onPeerMessage = (state, peer, data, hasDelay = false) => {
    const peerMessageType = data[0];
    // some fake delay
    // debug only
    if (state.ownClientId && state?.ownClientId > peer.clientId && !hasDelay) {
        setTimeout(() => {
            (0, exports.onPeerMessage)(state, peer, data, true);
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
        window.c.collaboration.incoming_callstack.push(PEER_MESSAGE_TYPE_MAP[peerMessageType]);
    switch (peerMessageType) {
        case constants_1.PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON:
            (0, handleFieldUnsubscribeOn_1.handleFieldUnsubscribeOn)(state, peer, data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_FIELD_DISSMISS:
            (0, handleFieldDissmiss_1.handleFieldDissmiss)(state, peer, data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON:
            (0, handleFieldActiveOn_1.handleFieldActiveOn)(state, peer, data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_FIELD_INACTIVE_ON:
            (0, handleFieldInactiveOn_1.handleFieldInactiveOn)(state, peer, data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE:
            (0, handleActiveDocumentChange_1.handleActiveDocumentChange)(state, peer, data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_ACTIVE_URL:
            (0, handleActiveURL_1.handleActiveURL)(state, peer, data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_PEER_MUTATION:
            (0, handlePeerMutation_1.handlePeerMutation)(data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_HOT_FIELD_UPDATE:
            (0, handleHotFieldUpdate_1.handleHotFieldUpdate)(state, data);
            break;
        case constants_1.PEER_MESSAGE_TYPE_PREVIEW_FIELD_UPDATE:
            (0, handlePreviewFieldUpdate_1.handlePreviewFieldUpdate)(data);
            break;
        default:
            console.log("Unknown peer message type:", peerMessageType);
            break;
    }
};
exports.onPeerMessage = onPeerMessage;

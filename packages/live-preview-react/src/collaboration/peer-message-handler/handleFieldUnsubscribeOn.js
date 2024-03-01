"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFieldUnsubscribeOn = void 0;
const constants_1 = require("../constants");
const encoding_1 = require("../encoding");
const keys_1 = require("../keys");
const handleFieldUnsubscribeOn = (state, peer, data) => {
    const field = (0, encoding_1.decodeFieldMessage)(data);
    removeFieldListener({ state, clientId: peer.clientId, ...field });
};
exports.handleFieldUnsubscribeOn = handleFieldUnsubscribeOn;
const removeFieldListener = ({ state, documentFieldLocaleId, blueprintFieldId, documentId, clientId, }) => {
    const fieldKey = (0, keys_1.getFieldKey)({
        type: constants_1.PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON,
        blueprintFieldId,
        documentId,
        documentFieldLocaleId,
    });
    if (state.fieldListener[fieldKey]) {
        state.fieldListener[fieldKey] = state.fieldListener[fieldKey].filter((u) => u !== clientId);
        if (state.fieldListener[fieldKey].length === 0) {
            delete state.fieldListener[fieldKey];
        }
    }
    state.pubsub.emit(fieldKey, [state.fieldListener[fieldKey]]);
};

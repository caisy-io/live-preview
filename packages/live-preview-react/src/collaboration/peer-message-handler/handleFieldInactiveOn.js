"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFieldInactiveOn = void 0;
const constants_1 = require("../constants");
const encoding_1 = require("../encoding");
const keys_1 = require("../keys");
const handleFieldInactiveOn = (state, peer, data) => {
    const field = (0, encoding_1.decodeFieldMessage)(data);
    removeActiveFieldCollaborator({ state, clientId: peer.clientId, ...field });
};
exports.handleFieldInactiveOn = handleFieldInactiveOn;
const removeActiveFieldCollaborator = ({ state, blueprintFieldId, documentId, clientId, }) => {
    const fieldKey = (0, keys_1.getFieldKey)({
        type: constants_1.PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON,
        blueprintFieldId,
        documentId,
    });
    if (state.fieldCollaborator[fieldKey]) {
        state.fieldCollaborator[fieldKey] = state.fieldCollaborator[fieldKey].filter((u) => u !== clientId);
        if (state.fieldCollaborator[fieldKey].length === 0) {
            delete state.fieldCollaborator[fieldKey];
        }
    }
    state.pubsub.emit(fieldKey, [state.fieldCollaborator[fieldKey]]);
};

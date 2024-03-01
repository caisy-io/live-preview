"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFieldActiveOn = void 0;
const onlyUnique_1 = require("../../helpers/onlyUnique");
const constants_1 = require("../constants");
const encoding_1 = require("../encoding");
const keys_1 = require("../keys");
const handleFieldActiveOn = (state, peer, data) => {
    const field = (0, encoding_1.decodeFieldMessage)(data);
    addActiveFieldCollaborator({ state, clientId: peer.clientId, ...field });
};
exports.handleFieldActiveOn = handleFieldActiveOn;
const addActiveFieldCollaborator = ({ state, blueprintFieldId, documentId, clientId, }) => {
    const fieldKey = (0, keys_1.getFieldKey)({
        type: constants_1.PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON,
        blueprintFieldId,
        documentId,
    });
    if (state.fieldCollaborator[fieldKey]) {
        state.fieldCollaborator[fieldKey] = [
            ...state.fieldCollaborator[fieldKey]
                .filter((c) => c != clientId)
                .filter(onlyUnique_1.onlyUnique),
            clientId,
        ];
    }
    else {
        state.fieldCollaborator[fieldKey] = [clientId];
    }
    state.pubsub.emit(fieldKey, [state.fieldCollaborator[fieldKey]]);
};

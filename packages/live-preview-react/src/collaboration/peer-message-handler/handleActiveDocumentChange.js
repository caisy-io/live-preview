"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleActiveDocumentChange = void 0;
const constants_1 = require("../constants");
const encoding_1 = require("../encoding");
const keys_1 = require("../keys");
const handleActiveDocumentChange = (state, peer, data) => {
    const update = (0, encoding_1.decodeAnyJSONMessage)(data);
    const valueBefore = state.documentCollaborator[peer.clientId] ?? [];
    const newValue = update;
    // all documents that are not in both arrays are broadcasted to pubsub as changed
    const diff = valueBefore
        .filter((x) => !newValue.includes(x))
        .concat(newValue.filter((x) => !valueBefore.includes(x)));
    state.documentCollaborator[peer.clientId] = update;
    diff.forEach((documentId) => {
        state.pubsub.emit((0, keys_1.getDocumentKey)({ type: constants_1.PUBSUB_KEY_DOCUMENT_ACTIVE_CHANGE, documentId }), []);
    });
};
exports.handleActiveDocumentChange = handleActiveDocumentChange;

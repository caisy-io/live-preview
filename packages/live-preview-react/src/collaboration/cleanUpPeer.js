"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUpPeer = void 0;
const constants_1 = require("./constants");
const keys_1 = require("./keys");
const cleanUpPeer = (state, id) => {
    const removingPeer = state.peers.find((p) => p.clientId === id);
    if (removingPeer) {
        removingPeer.destroy();
    }
    state.peers = state.peers.filter((p) => p.clientId !== id);
    // select new field leader if needed
    state.ownListeningFields.forEach((f) => {
        if (f.provider.leaderClientId == id) {
            let newLeader = state.ownClientId;
            Object.keys(f.peersSynced).forEach((clientId) => {
                if (clientId !== id && newLeader < clientId) {
                    newLeader = clientId;
                }
            });
            f.provider.setLeaderClientId(newLeader, state.ownClientId == newLeader);
        }
    });
    const activeDocuments = state.documentCollaborator[id];
    if (activeDocuments) {
        delete state.documentCollaborator[id];
        activeDocuments.forEach((documentId) => {
            state.pubsub.emit((0, keys_1.getDocumentKey)({ type: constants_1.PUBSUB_KEY_DOCUMENT_ACTIVE_CHANGE, documentId }), []);
        });
    }
    delete state.peerLocations[id];
    // remove from fieldCollaborator - this are the active user avatars shown on the fields
    Object.keys(state.fieldCollaborator).forEach((fieldKey) => {
        const collaborators = state.fieldCollaborator[fieldKey];
        let match = false;
        if (collaborators.includes(id)) {
            state.fieldCollaborator[fieldKey] = collaborators.filter((c) => c !== id);
            match = true;
            if (state.fieldCollaborator[fieldKey].length === 0) {
                delete state.fieldCollaborator[fieldKey];
            }
        }
        if (match) {
            state.pubsub.emit(fieldKey, [state.fieldCollaborator[fieldKey]]);
        }
    });
};
exports.cleanUpPeer = cleanUpPeer;

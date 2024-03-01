"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFieldDissmiss = void 0;
const encoding_1 = require("../encoding");
const helper_1 = require("./helper");
const handleFieldDissmiss = (state, peer, data) => {
    const field = (0, encoding_1.decodeFieldMessage)(data);
    const ownListeningField = (0, helper_1.findOwnListeningField)(state, field);
    if (!ownListeningField) {
        return;
    }
    ownListeningField.peersDismissed[peer.clientId] = true;
    if (state.peers.length &&
        state.peers.length <= Object.keys(ownListeningField.peersDismissed).length) {
        console.log(`i have ${state.peers.length} peers but no one is intrested in this field so i assingen myself to leader `);
        ownListeningField.provider.setLeaderClientId(state.ownClientId, true);
        ownListeningField.provider.setSynced(true);
        ownListeningField.provider.emit("synced", [{ synced: true }]);
    }
};
exports.handleFieldDissmiss = handleFieldDissmiss;

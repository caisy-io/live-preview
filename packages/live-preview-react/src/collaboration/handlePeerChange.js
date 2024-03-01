"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePeerChange = void 0;
const cleanUpPeer_1 = require("./cleanUpPeer");
const Peer_1 = require("./Peer");
const onlyUnique_1 = require("../helpers/onlyUnique");
const handlePeerChange = (clientIdsBefore, state) => {
    const newPeers = state.clientIds
        .filter((id) => id !== state.ownClientId &&
        !state.peers.map((p) => p.clientId).includes(id))
        .map((id) => new Peer_1.Peer(id));
    state.peers = [...state.peers, ...newPeers];
    const disconnectedPeerIds = [
        ...state.peers
            .filter((p) => !state.clientIds.includes(p.clientId))
            .map((p) => p.clientId),
        ...clientIdsBefore.filter((id) => !state.clientIds.includes(id)),
    ].filter(onlyUnique_1.onlyUnique);
    state.projectCollaborator = state.projectCollaborator.filter((c) => !disconnectedPeerIds.includes(c));
    disconnectedPeerIds.forEach((clientId) => {
        (0, cleanUpPeer_1.cleanUpPeer)(state, clientId);
    });
};
exports.handlePeerChange = handlePeerChange;

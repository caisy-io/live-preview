"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientIsPreviewRole = exports.broadcastToAllPeers = void 0;
const broadcastToAllPeers = (peers, msg) => {
    peers.forEach((p) => {
        p.send(msg);
    });
};
exports.broadcastToAllPeers = broadcastToAllPeers;
const clientIsPreviewRole = (clientId) => clientId[40] == "-";
exports.clientIsPreviewRole = clientIsPreviewRole;

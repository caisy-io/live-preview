"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLocalBroadcastMessage = void 0;
const constants_1 = require("./constants");
const encoding_1 = require("./encoding");
const onPeerMessage_1 = require("./onPeerMessage");
const onLocalBroadcastMessage = (state, message) => {
    try {
        const { t, from, to, data } = JSON.parse(message);
        switch (t) {
            case constants_1.BROADCASTCHANNEL_MESSAGE_TYPE_INIT:
                if (to == state.ownClientId) {
                    const peer = state.peers.find((p) => p.clientId == from);
                    if (peer && !peer.connectedLocal) {
                        peer.connectedLocal = true;
                        peer.lastPing = Date.now();
                        peer.localPingInterval = setInterval(() => {
                            state.localBroadcastChannel &&
                                peer &&
                                state.localBroadcastChannel.postMessage(JSON.stringify({
                                    t: constants_1.BROADCASTCHANNEL_MESSAGE_TYPE_PEER_PING,
                                    from: state.ownClientId,
                                    to: peer.clientId,
                                }));
                        }, 1000);
                        // send init back to approve it it was send to us for the first time
                        state.localBroadcastChannel.postMessage(JSON.stringify({
                            t: constants_1.BROADCASTCHANNEL_MESSAGE_TYPE_INIT,
                            from: state.ownClientId,
                            to: peer.clientId,
                        }));
                    }
                }
                break;
            case constants_1.BROADCASTCHANNEL_MESSAGE_TYPE_PEER_PING:
                if (to == state.ownClientId) {
                    const peer = state.peers.find((p) => p.clientId == from);
                    if (peer && peer.connectedLocal) {
                        peer.lastPing = Date.now();
                    }
                }
                break;
            case constants_1.BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE:
                if (to == state.ownClientId) {
                    const peer = state.peers.find((p) => p.clientId == from);
                    if (peer && peer.connectedLocal) {
                        (0, onPeerMessage_1.onPeerMessage)(state, peer, (0, encoding_1.base64ToUint8Array)(data));
                    }
                }
                break;
            default:
                console.error(`Unknown BROADCASTCHANNEL message type`, { t });
        }
    }
    catch (err) {
        console.error(`Error onLocalBroadcastMessage`, err, message);
    }
};
exports.onLocalBroadcastMessage = onLocalBroadcastMessage;

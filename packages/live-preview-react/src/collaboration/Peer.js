"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peer = void 0;
const SimplePeer = __importStar(require("simple-peer"));
const observable_1 = require("lib0/observable");
const router_1 = __importDefault(require("next/router"));
const constants_1 = require("./constants");
const encoding_1 = require("./encoding");
const onPeerMessage_1 = require("./onPeerMessage");
class Peer extends observable_1.Observable {
    clientId;
    websocket;
    p2p;
    localPingInterval;
    connectedP2P = false; // communication via p2p - will not in some networks such as vpn
    connectedLocal = false; // communication via local boradcast channel in the same browser
    lastPing = 0;
    constructor(clientId) {
        super();
        this.clientId = clientId;
        this.setupP2P();
        this.init();
    }
    init() {
        const state = window.c.collaboration;
        state.localBroadcastChannel.postMessage(JSON.stringify({
            t: constants_1.BROADCASTCHANNEL_MESSAGE_TYPE_INIT,
            to: this.clientId,
            from: state.ownClientId,
        }));
        state.ownListeningFields.forEach((f) => {
            this.send((0, encoding_1.encodeFieldMessage)({
                ...f,
                messageType: constants_1.PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON,
            }));
        });
        this.send((0, encoding_1.encodeAnyJSONMessage)({
            messageType: constants_1.PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE,
            body: window.c["activeDocumentIds"] || [],
        }));
        this.send((0, encoding_1.encodeAnyJSONMessage)({
            messageType: constants_1.PEER_MESSAGE_TYPE_ACTIVE_URL,
            body: { asPath: router_1.default.asPath },
        }));
        state.lastOwnActiveFieldMessage &&
            this.send(state.lastOwnActiveFieldMessage);
    }
    destroy() {
        this.localPingInterval && clearInterval(this.localPingInterval);
        super.destroy();
    }
    send(data) {
        const state = window.c.collaboration;
        if (window.c.debug) {
            this.connectedLocal
                ? console.log(` SENDING LOCAL`)
                : this.connectedP2P
                    ? console.log(` SENDING P2P`)
                    : console.log(` SENDING WS`);
        }
        if (this.connectedLocal && this.lastPing > Date.now() - 1500) {
            state.localBroadcastChannel.postMessage(JSON.stringify({
                t: constants_1.BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE,
                from: state.ownClientId,
                to: this.clientId,
                data: (0, encoding_1.uint8ArrayToBase64)(data),
            }));
            return;
        }
        if (this.connectedP2P) {
            const p2pIsReady = !this.p2p.destroying &&
                this.p2p._channel &&
                this.p2p._pcReady &&
                this.p2p._channel?.readyState == "open";
            if (p2pIsReady) {
                return this.p2p.send(data);
            }
            else {
                console.log(` P2P NOT READY using ws instead`);
            }
        }
        state.socket.send(JSON.stringify({
            t: constants_1.OUTGOING_SOCKET_MESSAGE_TYPE.PEER_MESSAGE,
            data: (0, encoding_1.uint8ArrayToBase64)(data),
            to: this.clientId,
        }));
    }
    signal(data) {
        this.p2p.signal(data);
    }
    handleSocketMessage(data) {
        (0, onPeerMessage_1.onPeerMessage)(window.c.collaboration, this, data);
    }
    setupP2P() {
        const state = window.c.collaboration;
        this.p2p = new SimplePeer({
            initiator: state.ownClientId > this.clientId,
        });
        this.p2p.on("data", (data) => {
            (0, onPeerMessage_1.onPeerMessage)(state, this, data);
        });
        this.p2p.on("signal", (data) => {
            // Send this data to the other peer, via your chosen signaling method
            state.socket?.send(JSON.stringify({
                t: constants_1.OUTGOING_SOCKET_MESSAGE_TYPE.SIGNAL,
                data,
                to: this.clientId,
            }));
        });
        this.p2p.on("error", (err) => {
            this.connectedP2P = false;
            console.log(" peer error", err);
            document.body.setAttribute("data-collaboration", "Disconnected");
        });
        this.p2p.on("close", () => {
            this.connectedP2P = false;
            console.log("peer closed");
            document.body.setAttribute("data-collaboration", "Reconnecting");
        });
        this.p2p.on("connect", () => {
            this.connectedP2P = true;
            document.body.setAttribute("data-collaboration", "Connected");
        });
    }
}
exports.Peer = Peer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCollaborationConnection = exports.hexDump = void 0;
// @ts-ignore
const observable_1 = require("lib0/observable");
const encoding_1 = require("./encoding");
const constants_1 = require("./constants");
const handlePeerChange_1 = require("./handlePeerChange");
const onLocalBroadcastMessage_1 = require("./onLocalBroadcastMessage");
const getSocket = ({ projectId, token, onMessage }) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_CORE_URL}`.replace("http", "ws") +
        `/api/i/v1/collaboration`;
    const socketUrl = `${baseUrl}/ws?token=${token}&project_id=${projectId}&role=preview`;
    const socket = new WebSocket(socketUrl);
    socket.onmessage = onMessage;
    socket.onopen = () => {
        console.log("WebSocket connection opened!");
        document.body.setAttribute("data-collaboration", "Connected");
    };
    socket.onerror = (error) => {
        console.error(`WebSocket error: `, { error });
        document.body.setAttribute("data-collaboration", "Reconnecting");
    };
    return { socket };
};
const hexDump = (buf) => buf.map((byte) => byte.toString(16).padStart(2, "0")).join(" ");
exports.hexDump = hexDump;
const startCollaborationConnection = ({ projectId, token, }) => {
    const state = {
        peers: [],
        localBroadcastChannel: null,
        clientIds: [],
        ownListeningFields: [],
        fieldCollaborator: {},
        documentCollaborator: {},
        peerLocations: {},
        projectCollaborator: [],
        fieldListener: {},
        socket: null,
        pubsub: new observable_1.Observable(),
        lastOwnActiveFieldMessage: null,
        connection: {
            wsAssignment: false,
            wsChange: false,
            p2p: false,
            isAlone: true,
        },
    };
    if (typeof window === "undefined")
        return;
    if (!window.c) {
        window.c = {};
    }
    window.c["collaboration"] = state;
    const onMessage = (raw) => {
        if (!raw.data)
            return;
        if (raw.data == "")
            return;
        const payload = JSON.parse(raw.data);
        switch (payload.t) {
            case constants_1.INCOMING_SOCKET_MESSAGE_TYPE.CHANGE:
                {
                    const clientIdsBefore = state.clientIds.slice();
                    state.clientIds = payload.clientIds;
                    state.connection.wsChange = true;
                    state.connection.isAlone = state.clientIds.length === 1;
                    state.pubsub.emit(constants_1.PUBSUB_KEY_CONNECTION, [state.connection]);
                    (0, handlePeerChange_1.handlePeerChange)(clientIdsBefore, state);
                }
                break;
            case constants_1.INCOMING_SOCKET_MESSAGE_TYPE.ASSIGNMENT:
                state.connection.wsAssignment = true;
                state.connection.isAlone = state.clientIds.length === 1;
                state.pubsub.emit(constants_1.PUBSUB_KEY_CONNECTION, [state.connection]);
                state.ownClientId = payload.clientId;
                break;
            case constants_1.INCOMING_SOCKET_MESSAGE_TYPE.SIGNAL:
                {
                    const peer = state.peers.find((peer) => peer.clientId === payload.from);
                    if (!peer)
                        return;
                    const signalObject = JSON.parse(atob(payload.data));
                    peer.signal(signalObject);
                }
                break;
            case constants_1.INCOMING_SOCKET_MESSAGE_TYPE.PEER_MESSAGE:
                {
                    const peer = state.peers.find((peer) => peer.clientId === payload.from);
                    if (!peer)
                        return;
                    if (!payload.data) {
                        console.error("no payload data", raw.data, payload);
                        return;
                    }
                    peer.handleSocketMessage((0, encoding_1.base64ToUint8Array)(payload.data));
                }
                break;
            default:
                console.error("unknown ws message type", payload.t);
        }
    };
    const { socket } = getSocket({ token, projectId, onMessage });
    state.socket = socket;
    state.localBroadcastChannel = new BroadcastChannel(`collaboration-${projectId}`);
    const listener = (event) => {
        (0, onLocalBroadcastMessage_1.onLocalBroadcastMessage)(state, event.data);
    };
    state.localBroadcastChannel.addEventListener("message", listener);
    const cleanUp = () => {
        if (state.localBroadcastChannel) {
            state.localBroadcastChannel.removeEventListener("message", listener);
            state.localBroadcastChannel.close();
        }
        if (state.socket !== null) {
            state.socket.onclose = () => {
                console.log("WebSocket is closed");
                document.body.setAttribute("data-collaboration", "Disconnected");
            };
            state.socket.close();
            state.socket = null;
        }
    };
    return cleanUp;
};
exports.startCollaborationConnection = startCollaborationConnection;

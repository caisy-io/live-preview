import { Observable } from "lib0/observable";
import { INCOMING_SOCKET_MESSAGE_TYPE, PUBSUB_KEY_CONNECTION } from "./constants";
import { base64ToUint8ArrayUnicode } from "./encoding";
import { handlePeerChange } from "./handlePeerChange";
import { onLocalBroadcastMessage } from "./onLocalBroadcastMessage";
import type { ICollaborationState } from "./types";

const getSocket = ({
    projectId,
    token,
    onMessage,
    caisyEndpoint,
}: {
    projectId: string;
    token: string;
    onMessage: (event: MessageEvent) => void;
    caisyEndpoint?: string;
}) => {
    const baseUrl =
        `${caisyEndpoint && caisyEndpoint != "" ? caisyEndpoint : "https://cloud.caisy.io"}`.replace("http", "ws") +
        `/api/i/v1/collaboration`;
    const socketUrl = `${baseUrl}/ws?token=${token}&project_id=${projectId}&role=preview`;

    const socket = new WebSocket(socketUrl);

    socket.onmessage = onMessage;

    socket.onopen = () => {
        document.body.setAttribute("data-collaboration", "Connected");
    };

    socket.onerror = (error) => {
        console.error(`WebSocket error:`);
        console.error(error);
        document.body.setAttribute("data-collaboration", "Reconnecting");
    };

    return { socket };
};

export const hexDump = (buf: any) => buf.map((byte: any) => byte.toString(16).padStart(2, "0")).join(" ");

export const startCollaborationConnection = ({
    projectId,
    token,
    caisyEndpoint,
}: {
    projectId: string;
    token: string;
    caisyEndpoint?: string;
}) => {
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
        pubsub: new Observable(),
        lastOwnActiveFieldMessage: null,
        connection: {
            wsAssignment: false,
            wsChange: false,
            p2p: false,
            isAlone: true,
        },
    } as unknown as ICollaborationState;

    if (typeof window === "undefined") return;
    if (!window.c) {
        window.c = {};
    }
    window.c["collaboration"] = state;

    const onMessage = (raw: any) => {
        if (!raw.data) return;
        if (raw.data == "") return;
        const payload = JSON.parse(raw.data);

        switch (payload.t) {
            case INCOMING_SOCKET_MESSAGE_TYPE.CHANGE:
                {
                    const clientIdsBefore = state.clientIds.slice();
                    state.clientIds = payload.clientIds;

                    state.connection.wsChange = true;
                    state.connection.isAlone = state.clientIds.length === 1;
                    state.pubsub.emit(PUBSUB_KEY_CONNECTION, [state.connection]);
                    handlePeerChange(clientIdsBefore, state);
                }
                break;
            case INCOMING_SOCKET_MESSAGE_TYPE.ASSIGNMENT:
                state.connection.wsAssignment = true;
                state.connection.isAlone = state.clientIds.length === 1;
                state.pubsub.emit(PUBSUB_KEY_CONNECTION, [state.connection]);

                state.ownClientId = payload.clientId;
                break;
            case INCOMING_SOCKET_MESSAGE_TYPE.SIGNAL:
                {
                    const peer = state.peers.find((peer) => peer.clientId === payload.from);
                    if (!peer) return;

                    const signalObject = JSON.parse(atob(payload.data));
                    peer.signal(signalObject);
                }
                break;
            case INCOMING_SOCKET_MESSAGE_TYPE.PEER_MESSAGE:
                {
                    const peer = state.peers.find((peer) => peer.clientId === payload.from);
                    if (!peer) return;
                    if (!payload.data) {
                        console.error("no payload data", raw.data, payload);
                        return;
                    }
                    peer.handleSocketMessage(base64ToUint8ArrayUnicode(payload.data));
                }
                break;
            case INCOMING_SOCKET_MESSAGE_TYPE.DEBUG:
                break;
            case INCOMING_SOCKET_MESSAGE_TYPE.YDOC_INIT_TO_CLIENT:
                break;
            case INCOMING_SOCKET_MESSAGE_TYPE.YDOC_NOT_FOUND_TO_CLIENT:
                break;
            case INCOMING_SOCKET_MESSAGE_TYPE.YDOC_UPDATE_TO_CLIENT:
                break;
            default:
                console.error("unknown ws message type", payload.t);
        }
    };

    const { socket } = getSocket({ token, projectId, onMessage, caisyEndpoint });
    state.socket = socket;

    state.localBroadcastChannel = new BroadcastChannel(`collaboration-${projectId}`);
    const listener = (event: any) => {
        onLocalBroadcastMessage(state, event.data);
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
            state.socket = null as any;
        }
    };

    return cleanUp;
};

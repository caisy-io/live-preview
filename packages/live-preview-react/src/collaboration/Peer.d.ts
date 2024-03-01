import * as SimplePeer from "simple-peer";
import { Observable } from "lib0/observable";
export declare class Peer extends Observable<any> {
    clientId: string;
    websocket: WebSocket;
    p2p: SimplePeer.Instance;
    localPingInterval: any;
    connectedP2P: boolean;
    connectedLocal: boolean;
    lastPing: number;
    constructor(clientId: string);
    init(): void;
    destroy(): void;
    send(data: Uint8Array): any;
    signal(data: any): void;
    handleSocketMessage(data: any): void;
    setupP2P(): void;
}
//# sourceMappingURL=Peer.d.ts.map
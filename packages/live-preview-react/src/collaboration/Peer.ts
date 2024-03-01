import * as SimplePeer from "simple-peer";
// @ts-ignore
import { Observable } from "lib0/observable";

import router from "next/router";
import {
  PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON,
  PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE,
  PEER_MESSAGE_TYPE_ACTIVE_URL,
  OUTGOING_SOCKET_MESSAGE_TYPE,
  BROADCASTCHANNEL_MESSAGE_TYPE_INIT,
  BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE,
} from "./constants";
import {
  encodeFieldMessage,
  encodeAnyJSONMessage,
  uint8ArrayToBase64,
} from "./encoding";
import { onPeerMessage } from "./onPeerMessage";

export class Peer extends Observable<any> {
  clientId: string;
  // @ts-ignore
  websocket: WebSocket;
  p2p: SimplePeer.Instance;
  localPingInterval: any;
  connectedP2P = false; // communication via p2p - will not in some networks such as vpn
  connectedLocal = false; // communication via local boradcast channel in the same browser
  lastPing = 0;

  constructor(clientId: string) {
    super();
    this.clientId = clientId;
    this.setupP2P();
    this.init();
  }

  init() {
    const state = window.c.collaboration!;

    state.localBroadcastChannel?.postMessage(
      JSON.stringify({
        t: BROADCASTCHANNEL_MESSAGE_TYPE_INIT,
        to: this.clientId,
        from: state.ownClientId,
      })
    );

    state.ownListeningFields.forEach((f) => {
      this.send(
        encodeFieldMessage({
          ...f,
          messageType: PEER_MESSAGE_TYPE_FIELD_SUBSCRIBE_ON,
        })
      );
    });

    this.send(
      encodeAnyJSONMessage({
        messageType: PEER_MESSAGE_TYPE_ACTIVE_DOCUMENT_CHANGE,
        body: window.c["activeDocumentIds"] || [],
      })
    );

    this.send(
      encodeAnyJSONMessage({
        messageType: PEER_MESSAGE_TYPE_ACTIVE_URL,
        body: { asPath: router.asPath },
      })
    );

    state.lastOwnActiveFieldMessage &&
      this.send(state.lastOwnActiveFieldMessage);
  }
  destroy() {
    this.localPingInterval && clearInterval(this.localPingInterval);
    super.destroy();
  }

  send(data: Uint8Array) {
    const state = window.c.collaboration!;

    if (window.c.debug) {
      this.connectedLocal
        ? console.log(` SENDING LOCAL`)
        : this.connectedP2P
          ? console.log(` SENDING P2P`)
          : console.log(` SENDING WS`);
    }

    if (this.connectedLocal && this.lastPing > Date.now() - 1500) {
      state.localBroadcastChannel?.postMessage(
        JSON.stringify({
          t: BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE,
          from: state.ownClientId,
          to: this.clientId,
          data: uint8ArrayToBase64(data),
        })
      );
      return;
    }

    if (this.connectedP2P) {
      const p2pIsReady =
        !this.p2p.destroying &&
        this.p2p._channel &&
        this.p2p._pcReady &&
        this.p2p._channel?.readyState == "open";
      if (p2pIsReady) {
        return this.p2p.send(data);
      } else {
        console.log(` P2P NOT READY using ws instead`);
      }
    }

    state.socket.send(
      JSON.stringify({
        t: OUTGOING_SOCKET_MESSAGE_TYPE.PEER_MESSAGE,
        data: uint8ArrayToBase64(data),
        to: this.clientId,
      })
    );
  }

  signal(data: any) {
    this.p2p.signal(data);
  }

  handleSocketMessage(data: any) {
    onPeerMessage(window.c.collaboration!, this, data);
  }

  setupP2P() {
    const state = window.c.collaboration!;

    this.p2p = new SimplePeer({
      initiator: (state?.ownClientId as string) > this.clientId,
    });

    this.p2p.on("data", (data) => {
      onPeerMessage(state, this, data);
    });

    this.p2p.on("signal", (data) => {
      // Send this data to the other peer, via your chosen signaling method
      state.socket?.send(
        JSON.stringify({
          t: OUTGOING_SOCKET_MESSAGE_TYPE.SIGNAL,
          data,
          to: this.clientId,
        })
      );
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

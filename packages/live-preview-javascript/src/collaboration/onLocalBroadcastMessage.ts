import {
  BROADCASTCHANNEL_MESSAGE_TYPE_INIT,
  BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE,
  BROADCASTCHANNEL_MESSAGE_TYPE_PEER_PING,
} from "./constants";
import { base64ToUint8Array } from "./encoding";
import { onPeerMessage } from "./onPeerMessage";
import { ICollaborationState } from "./types";

export const onLocalBroadcastMessage = (
  state: ICollaborationState,
  message: any
) => {
  try {
    const { t, from, to, data } = JSON.parse(message);
    switch (t) {
      case BROADCASTCHANNEL_MESSAGE_TYPE_INIT:
        if (to == state.ownClientId) {
          const peer = state.peers.find((p) => p.clientId == from);
          if (peer && !peer.connectedLocal) {
            peer.connectedLocal = true;
            peer.lastPing = Date.now();
            peer.localPingInterval = setInterval(() => {
              state.localBroadcastChannel &&
                peer &&
                state.localBroadcastChannel.postMessage(
                  JSON.stringify({
                    t: BROADCASTCHANNEL_MESSAGE_TYPE_PEER_PING,
                    from: state.ownClientId,
                    to: peer.clientId,
                  })
                );
            }, 1000);

            // send init back to approve it it was send to us for the first time
            state.localBroadcastChannel.postMessage(
              JSON.stringify({
                t: BROADCASTCHANNEL_MESSAGE_TYPE_INIT,
                from: state.ownClientId,
                to: peer.clientId,
              })
            );
          }
        }
        break;
      case BROADCASTCHANNEL_MESSAGE_TYPE_PEER_PING:
        if (to == state.ownClientId) {
          const peer = state.peers.find((p) => p.clientId == from);
          if (peer && peer.connectedLocal) {
            peer.lastPing = Date.now();
          }
        }
        break;
      case BROADCASTCHANNEL_MESSAGE_TYPE_PEER_MESSAGE:
        if (to == state.ownClientId) {
          const peer = state.peers.find((p) => p.clientId == from);
          if (peer && peer.connectedLocal) {
            onPeerMessage(state, peer, base64ToUint8Array(data));
          }
        }
        break;
      default:
        console.error(`Unknown BROADCASTCHANNEL message type`, { t });
    }
  } catch (err) {
    console.error(`Error onLocalBroadcastMessage`, err, message);
  }
};

import { Peer } from "./Peer";

export const broadcastToAllPeers = (peers: Peer[], msg: Uint8Array) => {
  peers.forEach((p) => {
    p.send(msg);
  });
};

export const clientIsPreviewRole = (clientId: string) => clientId[40] == "-";

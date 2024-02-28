import { ICollaborationState } from "./types";
import { cleanUpPeer } from "./cleanUpPeer";
import { Peer } from "./Peer";
import { onlyUnique } from "../helpers/onlyUnique";

export const handlePeerChange = (
  clientIdsBefore: string[],
  state: ICollaborationState
) => {
  const newPeers = state.clientIds
    .filter(
      (id) =>
        id !== state.ownClientId &&
        !state.peers.map((p) => p.clientId).includes(id)
    )
    .map((id) => new Peer(id));

  state.peers = [...state.peers, ...newPeers];

  const disconnectedPeerIds = [
    ...state.peers
      .filter((p) => !state.clientIds.includes(p.clientId))
      .map((p) => p.clientId),
    ...clientIdsBefore.filter((id) => !state.clientIds.includes(id)),
  ].filter(onlyUnique);

  state.projectCollaborator = state.projectCollaborator.filter(
    (c) => !disconnectedPeerIds.includes(c)
  );
  disconnectedPeerIds.forEach((clientId) => {
    cleanUpPeer(state, clientId);
  });
};

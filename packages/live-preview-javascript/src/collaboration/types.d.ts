// notice this types will be gobal available in the project
// so only global needed ones should be added here
import { PubSub } from "../pubsub";
import { CaisyYjsProvider } from "./CaisyYjsProvider";
import { Peer } from "./Peer";
import { Observable } from "lib0/observable";

export type IPeer = Peer;
export interface IListeningField {
  documentId: string;
  blueprintFieldId: string;
  documentFieldLocaleId: string;
  provider: CaisyYjsProvider;
  synced?: boolean;
  peersSynced: { [clientId: string]: boolean };
  peersDismissed: { [clientId: string]: boolean };
}

export interface ICollaborationLocation {
  asPath: string;
}
export interface ICollaborationState {
  peers: Peer[];
  localBroadcastChannel: BroadcastChannel | null;
  socket: WebSocket;
  ownClientId?: string;
  clientIds: string[];
  fieldCollaborator: { [fieldKey: string]: string[] };
  fieldListener: { [fieldKey: string]: string[] };
  projectCollaborator: string[];
  documentCollaborator: { [clientId: string]: string[] };
  peerLocations: { [clientId: string]: ICollaborationLocation };
  ownListeningFields: IListeningField[];
  pubsub: Observable<any>;
  lastOwnActiveFieldMessage: Uint8Array | null;
  connection: {
    wsAssignment: boolean;
    wsChange: boolean;
    p2p: boolean;
    isAlone: boolean;
  };
}

// declare global {
//   // eslint-disable-next-line @typescript-eslint/naming-convention
//   interface Window {
//     c: {
//       collaboration?: ICollaborationState;
//       activeDocumentIds?: string[];
//       profiles?: {
//         [userId: string]: {
//           displayName?: string;
//           email?: string;
//           userId?: string;
//         };
//       };
//       preview?: {
//         pubsub: PubSub<any>;
//       };
//       debug?: boolean;
//     };
//   }
// }

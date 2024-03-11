import { PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON } from "../constants";
import { decodeFieldMessage } from "../encoding";
import { getFieldKey } from "../keys";
import { ICollaborationState, IPeer } from "../types";

export const handleFieldInactiveOn = (
  state: ICollaborationState,
  peer: IPeer,
  data: Uint8Array
) => {
  const field = decodeFieldMessage(data);
  removeActiveFieldCollaborator({ state, clientId: peer.clientId, ...field });
};

const removeActiveFieldCollaborator = ({
  state,
  blueprintFieldId,
  documentId,
  clientId,
}) => {
  const fieldKey = getFieldKey({
    type: PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON,
    blueprintFieldId,
    documentId,
  });

  if (state.fieldCollaborator[fieldKey]) {
    state.fieldCollaborator[fieldKey] = state.fieldCollaborator[
      fieldKey
    ].filter((u) => u !== clientId);
    if (state.fieldCollaborator[fieldKey].length === 0) {
      delete state.fieldCollaborator[fieldKey];
    }
  }

  state.pubsub.emit(fieldKey, [state.fieldCollaborator[fieldKey]]);
};

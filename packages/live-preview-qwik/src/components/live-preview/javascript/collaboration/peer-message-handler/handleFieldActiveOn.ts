import { onlyUnique } from "../../helpers/onlyUnique";
import { PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON } from "../constants";
import { decodeFieldMessage } from "../encoding";
import { getFieldKey } from "../keys";
import type { ICollaborationState, IPeer } from "../types";

export const handleFieldActiveOn = (state: ICollaborationState, peer: IPeer, data: any) => {
    const field = decodeFieldMessage(data);
    addActiveFieldCollaborator({ state, clientId: peer.clientId, ...field });
};

const addActiveFieldCollaborator = ({
    state,
    blueprintFieldId,
    documentId,
    clientId,
}: {
    state: ICollaborationState;
    blueprintFieldId: string;
    documentId: string;
    clientId: string;
}) => {
    const fieldKey = getFieldKey({
        type: PEER_MESSAGE_TYPE_FIELD_ACTIVE_ON,
        blueprintFieldId,
        documentId,
    });
    if (state.fieldCollaborator[fieldKey]) {
        state.fieldCollaborator[fieldKey] = [
            ...state.fieldCollaborator[fieldKey].filter((c: any) => c != clientId).filter(onlyUnique),
            clientId,
        ];
    } else {
        state.fieldCollaborator[fieldKey] = [clientId];
    }
    state.pubsub.emit(fieldKey, [state.fieldCollaborator[fieldKey]]);
};

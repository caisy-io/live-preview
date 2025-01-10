import { PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON } from "../constants";
import { decodeFieldMessage } from "../encoding";
import { getFieldKey } from "../keys";
import type { ICollaborationState, IPeer } from "../types";

export const handleFieldUnsubscribeOn = (state: ICollaborationState, peer: IPeer, data: Uint8Array) => {
    const field = decodeFieldMessage(data);
    removeFieldListener({ state, clientId: peer.clientId, ...field });
};

const removeFieldListener = ({
    state,
    documentFieldLocaleId,
    blueprintFieldId,
    documentId,
    clientId,
}: {
    state: ICollaborationState;
    documentFieldLocaleId: string;
    blueprintFieldId: string;
    documentId: string;
    clientId: string;
}) => {
    const fieldKey = getFieldKey({
        type: PEER_MESSAGE_TYPE_FIELD_UNSUBSCRIBE_ON,
        blueprintFieldId,
        documentId,
        documentFieldLocaleId,
    });

    if (state.fieldListener[fieldKey]) {
        state.fieldListener[fieldKey] = state.fieldListener[fieldKey].filter((u: any) => u !== clientId);
        if (state.fieldListener[fieldKey].length === 0) {
            delete state.fieldListener[fieldKey];
        }
    }

    state.pubsub.emit(fieldKey, [state.fieldListener[fieldKey]]);
};

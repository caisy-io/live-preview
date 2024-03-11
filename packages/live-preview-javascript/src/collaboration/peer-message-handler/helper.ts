import { ICollaborationState, IListeningField } from "../types";

export const findOwnListeningField = (
  state: ICollaborationState,
  field: {
    documentId: string;
    documentFieldLocaleId?: string;
    blueprintFieldId: string;
  }
): IListeningField | undefined => {
  return state.ownListeningFields.find(
    (f) =>
      f.documentId === field.documentId &&
      f.documentFieldLocaleId === field.documentFieldLocaleId &&
      f.blueprintFieldId === field.blueprintFieldId
  );
};

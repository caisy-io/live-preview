export const getFieldKey = ({
  documentFieldLocaleId,
  documentId,
  blueprintFieldId,
  type,
}: {
  type: number;
  documentId: string;
  blueprintFieldId: string;
  projectId?: string;
  documentFieldLocaleId?: string;
}) => `${type}${documentId}${blueprintFieldId}${documentFieldLocaleId || ""}`;

export const getDocumentKey = ({ documentId, type }: { type: number | string; documentId: string }) =>
  getSimpleKey(type, documentId);

export const getSimpleKey = (type: number | string, id: string) => `${type}${id}`;

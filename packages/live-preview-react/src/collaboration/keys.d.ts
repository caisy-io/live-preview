export declare const getFieldKey: ({ documentFieldLocaleId, documentId, blueprintFieldId, type, }: {
    type: number;
    documentId: string;
    blueprintFieldId: string;
    projectId?: string | undefined;
    documentFieldLocaleId?: string | undefined;
}) => string;
export declare const getDocumentKey: ({ documentId, type }: {
    type: number | string;
    documentId: string;
}) => string;
export declare const getSimpleKey: (type: number | string, id: string) => string;
//# sourceMappingURL=keys.d.ts.map
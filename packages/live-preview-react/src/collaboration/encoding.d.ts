export declare const decodeFieldMessage: (message: Uint8Array) => {
    documentId: string | undefined;
    documentFieldLocaleId: string | undefined;
    blueprintFieldId: string | undefined;
    syncChecksum: string | undefined;
    body: Uint8Array;
};
export declare const encodeFieldMessage: ({ messageType, blueprintFieldId, documentFieldLocaleId, documentId, syncChecksum, body, }: {
    messageType: number;
    blueprintFieldId: string;
    documentFieldLocaleId: string;
    documentId: string;
    syncChecksum?: string | undefined;
    body?: any;
}) => Uint8Array;
export declare const encodeAnyJSONMessage: ({ messageType, body, }: {
    messageType: number;
    body?: any;
}) => Uint8Array;
export declare const decodeAnyJSONMessage: (message: Uint8Array) => any;
export declare const encodeHotFieldUpdate: ({ projectId, documentId, blueprintFieldId, documentFieldLocaleId, data, }: {
    projectId: string;
    documentId: string;
    blueprintFieldId: string;
    documentFieldLocaleId: string;
    data: any;
}) => Uint8Array;
export declare const decodeHotFieldUpdate: (message: Uint8Array) => {
    documentFieldLocaleId: string;
    metaKey: string;
    data: any;
};
export declare function uint8ArrayToBase64(bytes: Uint8Array): string;
export declare function base64ToUint8Array(base64: string): Uint8Array;
//# sourceMappingURL=encoding.d.ts.map
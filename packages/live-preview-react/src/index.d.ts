export declare function useCaisyUpdates<T>(originalData: T, options?: {
    locale?: string;
}): T;
export declare const getInspectProps: ({ id, fieldName, disabled, }: {
    id: string;
    fieldName: string;
    disabled?: boolean | undefined;
}) => {
    "data-caisy-document-id"?: undefined;
    "data-caisy-field-name"?: undefined;
} | {
    "data-caisy-document-id": string;
    "data-caisy-field-name": string;
};
export declare const getCaisyInspectProps: ({ id, fieldName, disabled, }: {
    id: string;
    fieldName: string;
    disabled?: boolean | undefined;
}) => {
    "data-caisy-document-id"?: undefined;
    "data-caisy-field-name"?: undefined;
} | {
    "data-caisy-document-id": string;
    "data-caisy-field-name": string;
};
export interface ILivePreviewSettings {
    projectId: string;
    token: string;
    locale?: string;
    inspectMode?: boolean;
    debug?: boolean;
    namespace?: string;
    enabled?: boolean;
}
export declare const init: (settings: ILivePreviewSettings) => (() => void) | undefined;
//# sourceMappingURL=index.d.ts.map
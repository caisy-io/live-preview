export function getCaisyInspectProps({
    id,
    fieldName,
}: {
    id: string | undefined | null;
    fieldName: string;
}) {
    return {
        "data-caisy-document-id": id,
        "data-caisy-field-name": fieldName,
    };
}

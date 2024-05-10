export default function ({
  id,
  fieldName,
  disabled,
}: {
  id: string;
  fieldName: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return {};
  }

  return {
    "data-caisy-document-id": id,
    "data-caisy-field-name": fieldName,
  };
}

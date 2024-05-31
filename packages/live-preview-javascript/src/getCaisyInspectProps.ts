/* 
To utilize the inspection feature, you must label fields by incorporating the live preview data-attributes (data-caisy-document-id, data-caisy-field-name) into the displayed HTML element result.

<h1 {...getInspectProps({ id, fieldName: 'title' })}>
  {title}
</h1>

*/

/* 
edge cases:
- two projects are beeing fetched in one frontend -> overwrite globale variable name,project id and token
- switching locales in the frontend -> overwrite globale variable locale and replace content
*/

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

import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { CenterContainer } from "../CenterContainer";
import { DocumentLink } from "./overwrites/DocumentLink";
import { getCaisyInspectProps } from "@caisy/live-preview-javascript";

interface IFullText {
  text?: any;
  id?: any;
}

export const FullText: React.FC<IFullText> = (props) => {
  const { text } = props;

  return (
    <CenterContainer>
      <article
        {...(text?.json?.content &&
          getCaisyInspectProps({
            id: props?.id,
            fieldName: "text",
          }))}
        className="prose lg:prose-xl"
      >
        {text?.json && (
          <RichTextRenderer
            node={text?.json}
            overwrites={{
              documentLink: (props) =>
                props?.node && text?.connections ? (
                  <DocumentLink
                    node={props.node}
                    connections={text.connections}
                  />
                ) : null,
            }}
          />
        )}
      </article>
    </CenterContainer>
  );
};

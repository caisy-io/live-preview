import React from "react";
import { SCompTextBlock } from "./styles/SCompTextBlock";
import { RichText } from "../../base-components/rich-text/RichText";
import { IGenCompTextBlock } from "../../utils/types_gen";
import { GridPadding } from "../../base-components/grid-padding/GridPadding";
import { GridItem } from "../../base-components/grid-item/GridItem";
import { Grid } from "../../base-components/grid/Grid";
import { SCompImageWithTextButton } from "../comp-image-with-text/styles/SCompImageWithTextButton";
import { SCompTextBlockButtonWrapper } from "./styles/SCompTextBlockButtonWrapper";
import { useCaisyUpdates } from "@caisy/live-preview-react";
import { getCaisyInspectProps } from "@caisy/live-preview-react";
import { Button } from "../button/Button";

export const CompTextBlock: React.FC<
  React.PropsWithChildren<IGenCompTextBlock>
> = (props) => {
  const { text, buttons } = useCaisyUpdates({ ...props });

  return (
    <GridPadding>
      <Grid>
        <GridItem bronze={{ start: 1, end: 4 }} silver={{ start: 3, end: 8 }}>
          <SCompTextBlock
            {...(text?.json?.content &&
              getCaisyInspectProps({ id: props.id, fieldName: "text" }))}
          >
            {text?.json?.content && (
              <RichText content={text.json.content}></RichText>
            )}
          </SCompTextBlock>
          <SCompTextBlockButtonWrapper
            {...(buttons &&
              buttons.length >= 1 &&
              getCaisyInspectProps({ id: props.id, fieldName: "buttons" }))}
          >
            {buttons.map((button, index) => {
              const buttonStyle: string = (button as any)?.style;
              return (
                <SCompImageWithTextButton
                  buttonStyle={buttonStyle}
                  key={"button" + index + button.id}
                >
                  {button && <Button {...button}></Button>}
                </SCompImageWithTextButton>
              );
            })}
          </SCompTextBlockButtonWrapper>
        </GridItem>
      </Grid>
    </GridPadding>
  );
};

import React from "react";
import { GridItem } from "../../base-components/grid-item/GridItem";
import { SGridPadding } from "../../base-components/grid-padding/styles/SGridPadding";
import { SGrid } from "../../base-components/grid/styles/SGrid";
import { IGenCompImageWithText } from "../../utils/types_gen";
import { Text } from "../text/Text";
import { SCompImageWithText } from "./styles/SCompImageWithText";
import { SCompImageWithTextButton } from "./styles/SCompImageWithTextButton";
import { SCompImageWithTextButtonWrapper } from "./styles/SCompImageWithTextButtonWrapper";
import { SCompImageWithTextComponentWrapper } from "./styles/SCompImageWithTextComponentWrapper";
import { SCompImageWithTextHeadline } from "./styles/SCompImageWithTextHeadline";
import { SCompImageWithTextImageSide } from "./styles/SCompImageWithTextImageSide";
import { SCompImageWithTextText } from "./styles/SCompImageWithTextText";
import { SCompImageWithTextTextSide } from "./styles/SCompImageWithTextTextSide";
import { SCompImageWithTextTitle } from "./styles/SCompImageWithTextTitle";
import { useCaisyUpdates } from "@caisy/live-preview-react";
import { getCaisyInspectProps } from "@caisy/live-preview-react";
import { CompImageWithTextAsset } from "./CompImageWithTextAsset";
import { Button } from "../button/Button";

export const CompImageWithText: React.FC<
  React.PropsWithChildren<IGenCompImageWithText>
> = (props) => {
  const { imageRightInsteadOfLeft, text, buttons, strap, headline, asset, id } =
    useCaisyUpdates({ ...props });

  return (
    <SCompImageWithText>
      <SGridPadding>
        <SGrid>
          <GridItem
            bronze={{ start: 1, end: 4 }}
            silver={{ start: 1, end: 12 }}
            gold={{ start: 2, end: 11 }}
          >
            <SCompImageWithTextComponentWrapper
              imageRightInsteadOfLeft={!!imageRightInsteadOfLeft}
            >
              <SCompImageWithTextImageSide
                {...getCaisyInspectProps({
                  id,
                  fieldName: "asset",
                })}
              >
                {asset && asset[0] && <CompImageWithTextAsset {...asset[0]} />}
              </SCompImageWithTextImageSide>

              <SCompImageWithTextTextSide
                imageRightInsteadOfLeft={!!imageRightInsteadOfLeft}
              >
                <SCompImageWithTextTitle
                  {...getCaisyInspectProps({
                    id,
                    fieldName: "strap",
                  })}
                >
                  {strap && strap}
                </SCompImageWithTextTitle>

                <SCompImageWithTextHeadline
                  {...getCaisyInspectProps({
                    id,
                    fieldName: "headline",
                  })}
                >
                  {headline && headline}
                </SCompImageWithTextHeadline>

                <SCompImageWithTextText
                  {...getCaisyInspectProps({
                    id,
                    fieldName: "text",
                  })}
                >
                  {text?.json && <Text json={text?.json} />}
                </SCompImageWithTextText>

                <SCompImageWithTextButtonWrapper
                  {...(buttons &&
                    buttons.length >= 1 &&
                    getCaisyInspectProps({ id, fieldName: "buttons" }))}
                >
                  {buttons?.map((button, index) => {
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
                </SCompImageWithTextButtonWrapper>
              </SCompImageWithTextTextSide>
            </SCompImageWithTextComponentWrapper>
          </GridItem>
        </SGrid>
      </SGridPadding>
    </SCompImageWithText>
  );
};

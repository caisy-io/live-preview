import React from "react";
import { RichText } from "../../../base-components/rich-text/RichText";
import { IGenCompHeroSliderSlide, IGenAsset } from "../../../utils/types_gen";
import { SCompHeroSliderSlide } from "./styles/SCompHeroSliderSlide";
import { SCompHeroSliderSlideHeadline } from "./styles/SCompHeroSliderSlideHeadline";
import { SCompHeroSliderSlideText } from "./styles/SCompHeroSliderSlideText";
import { SCompHeroSliderSlideTextContainer } from "./styles/SCompHeroSliderSlideTextContainer";
import Image from "next/legacy/image";
import { SCompHeroSliderSlideImage } from "./styles/SCompHeroSliderSlideImage";
import { SCompHeroSliderSlideBackdrop } from "../styles/SCompHeroSliderSlideBackdrop";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-javascript/useCaisyUpdates";
import { getInspectProps } from "@nicolasshiken/live-preview-javascript/getInspectProps";

export const CompHeroSliderSlide: React.FC<
  React.PropsWithChildren<
    Omit<IGenCompHeroSliderSlide, "__typename"> & {
      active: boolean;
      transitionFrom?: boolean;
    }
  >
> = ({ headline, text, backgroundImage, active, transitionFrom, ...props }) => {
  const _imageForUpdates = backgroundImage?.find(
    (image) => image?.__typename === "Asset"
  ) as IGenAsset;

  const _image = useCaisyUpdates(_imageForUpdates);

  return (
    <SCompHeroSliderSlide active={active} transitionFrom={transitionFrom}>
      <SCompHeroSliderSlideBackdrop> </SCompHeroSliderSlideBackdrop>
      <SCompHeroSliderSlideImage
        dominantColor={_image?.dominantColor ?? "#FFF"}
      >
        <>
          {_image?.src ? (
            <Image
              layout="responsive"
              src={_image?.src}
              width={typeof window != "undefined" ? window.innerWidth : 1920}
              height={typeof window != "undefined" ? window.innerHeight : 1080}
              alt={_image?.description}
            />
          ) : null}
        </>
      </SCompHeroSliderSlideImage>
      <SCompHeroSliderSlideTextContainer>
        {headline && (
          <SCompHeroSliderSlideHeadline
            {...getInspectProps({ id: props.id, fieldName: "headline" })}
          >
            {headline}
          </SCompHeroSliderSlideHeadline>
        )}
        <SCompHeroSliderSlideText
          {...getInspectProps({ id: props.id, fieldName: "text" })}
        >
          {text?.json?.content && (
            <RichText content={text.json.content}></RichText>
          )}
        </SCompHeroSliderSlideText>
        {props.children}
      </SCompHeroSliderSlideTextContainer>
    </SCompHeroSliderSlide>
  );
};

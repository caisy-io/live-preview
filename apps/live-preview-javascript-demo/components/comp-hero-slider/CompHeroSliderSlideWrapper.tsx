import React, { Fragment } from "react";
import { IGenCompHeroSliderSlide } from "../../utils/types_gen";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-javascript/useCaisyUpdates";
import { getInspectProps } from "@nicolasshiken/live-preview-javascript/getInspectProps";
import { CompHeroSliderSlide } from "./comp-hero-slider-slide/CompHeroSliderSlide";
import { SCompHeroSliderPageIndicatorContainer } from "./styles/SCompHeroSliderPageIndicatorContainer";
import { SCompHeroSliderPageIndicatorLine } from "./styles/SCompHeroSliderPageIndicatorLine";
import { SCompHeroSliderPageIndicatorLineProgress } from "./styles/SCompHeroSliderPageIndicatorLineProgress";
import { SCompHeroSliderPageIndicatorTitle } from "./styles/SCompHeroSliderPageIndicatorTitle";

export const CompHeroSliderSlideWrapper: React.FC<
  React.PropsWithChildren<IGenCompHeroSliderSlide & any>
> = ({
  transitionFromSlide,
  index,
  activeSlide,
  setTtransitionFromSlide,
  setActiveSlideManual,
  setActiveSlide,
  refActiveSlide,
  timePerSlide,
  slidesLength,
  ...props
}) => {
  const slide = useCaisyUpdates({
    ...props,
  });

  return (
    <Fragment>
      <CompHeroSliderSlide
        {...slide}
        transitionFrom={
          transitionFromSlide === undefined
            ? undefined
            : index === transitionFromSlide
        }
        active={index === activeSlide}
      />
      <SCompHeroSliderPageIndicatorContainer
        index={index}
        active={index === activeSlide}
        onClick={() => {
          if (slidesLength > 1) {
            setTtransitionFromSlide(activeSlide);
            setActiveSlide(index);
            setActiveSlideManual(index);
            refActiveSlide.current = index;
          }
        }}
      >
        <SCompHeroSliderPageIndicatorTitle
          {...getInspectProps({ id: slide.id, fieldName: "headline" })}
          transitionFrom={index === transitionFromSlide}
          active={index === activeSlide}
        >
          {slide.headline && slide.headline}
        </SCompHeroSliderPageIndicatorTitle>
        <SCompHeroSliderPageIndicatorLine>
          <SCompHeroSliderPageIndicatorLineProgress
            active={index === activeSlide}
            timePerSlide={timePerSlide}
          ></SCompHeroSliderPageIndicatorLineProgress>
        </SCompHeroSliderPageIndicatorLine>
      </SCompHeroSliderPageIndicatorContainer>
    </Fragment>
  );
};

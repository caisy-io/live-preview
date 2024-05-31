import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  IGenCompHeroSlider,
  IGenCompHeroSliderSlide,
} from "../../utils/types_gen";
import { CompHeroSliderScrollDownButton } from "./CompHeroSliderScrollDownButton";
import { SCompHeroSlider } from "./styles/SCompHeroSlider";
import { useCaisyUpdates } from "@caisy/live-preview-react/useCaisyUpdates";
import { CompHeroSliderSlideWrapper } from "./CompHeroSliderSlideWrapper";

export const CompHeroSlider: React.FC<
  React.PropsWithChildren<IGenCompHeroSlider>
> = (props) => {
  const [activeSlideManual, setActiveSlideManual] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [transitionFromSlide, setTtransitionFromSlide] = useState<
    number | undefined
  >(undefined);

  const intervalRef = useRef<any>();
  const refActiveSlide = useRef<number>();
  const timePerSlide = 5000;
  const { slides } = useCaisyUpdates({ ...props });

  useEffect(() => {
    if (slides && slides.length > 1) {
      intervalRef.current = setInterval(() => {
        if (slides && slides.length > 1) {
          setTtransitionFromSlide(refActiveSlide.current || 0);
          setActiveSlide((value: number) => {
            return slides.length - 1 == value ? 0 : value + 1;
          });
          refActiveSlide.current =
            slides.length - 1 == refActiveSlide.current
              ? 0
              : refActiveSlide.current + 1;
        }
      }, timePerSlide);
    }
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
    // if we trigger a new slide by click we reset the interval
  }, [activeSlideManual]);

  return (
    <SCompHeroSlider>
      {slides &&
        slides.map((slide: IGenCompHeroSliderSlide, index) => {
          return (
            <Fragment key={slide.id}>
              <CompHeroSliderSlideWrapper
                transitionFromSlide={transitionFromSlide}
                index={index}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
                setTtransitionFromSlide={setTtransitionFromSlide}
                setActiveSlideManual={setActiveSlideManual}
                refActiveSlide={refActiveSlide}
                timePerSlide={timePerSlide}
                slidesLength={slides ? slides.length : 0}
                {...slide}
              />
            </Fragment>
          );
        })}
      <CompHeroSliderScrollDownButton
        onClick={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({
              top: window.innerHeight,
              left: 0,
              behavior: "smooth",
            });
          }
        }}
      ></CompHeroSliderScrollDownButton>
    </SCompHeroSlider>
  );
};

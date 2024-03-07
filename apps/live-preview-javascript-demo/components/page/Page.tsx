import React, { Fragment } from "react";
import { IGenPage } from "../../utils/types_gen";
import { CompFaq } from "../comp-faq/CompFaq";
import { CompHeroSlider } from "../comp-hero-slider/CompHeroSlider";
import { CompImageWithText } from "../comp-image-with-text/CompImageWithText";
import { CompPageHeader } from "../comp-page-header/CompPageHeader";
import { CompSectionHeader } from "../comp-section-header/CompSectionHeader";
import { CompTextBlock } from "../comp-text-block/CompTextBlock";
import { SPage } from "./styles/SPage";
import { CompVideo } from "../comp-video/CompVideo";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-javascript/useCaisyUpdates";

export const Page: React.FC<
  React.PropsWithChildren<IGenPage & { homePageSlug?: string }>
> = (props) => {
  const { components } = useCaisyUpdates(props);
  return (
    <SPage>
      {components &&
        components.map((component: any, index) => {
          switch (true) {
            case component?.__typename === "CompFaq":
              return (
                <Fragment key={`pc-${index}`}>
                  <CompFaq {...component} />
                </Fragment>
              );
            case component?.__typename === "CompImageWithText":
              return (
                <Fragment key={`pc-${index}`}>
                  <CompImageWithText {...component} />
                </Fragment>
              );
            case component?.__typename === "CompHeroSlider":
              return (
                <Fragment key={`pc-${index}`}>
                  <CompHeroSlider {...component} />
                </Fragment>
              );
            case component?.__typename === "CompPageHeader":
              return (
                <Fragment key={`pc-${index}`}>
                  <CompPageHeader {...component} />
                </Fragment>
              );
            case component?.__typename === "CompTextBlock":
              return (
                <Fragment key={`pc-${index}`}>
                  <CompTextBlock {...component} />
                </Fragment>
              );
            case component?.__typename === "CompSectionHeader":
              return (
                <Fragment key={`pc-${index}`}>
                  <CompSectionHeader {...component} />
                </Fragment>
              );
            case component?.__typename === "Video":
              return (
                <Fragment key={`pc-${index}`}>
                  <CompVideo {...component} />
                </Fragment>
              );
            default:
              return null;
          }
        })}
      {props.children}
    </SPage>
  );
};

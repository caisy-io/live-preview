import React, { FC } from "react";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-javascript/useCaisyUpdates";
import Link from "next/link";
import {
  IGenCompButton,
  IGenCompButtonExternalLinks,
} from "../../../utils/types_gen";
import { SHeaderMenuImprintElement } from "./styles/SHeaderMenuImprintElement";

export const HeaderMenuLegalLink: FC<any> = ({
  setIsOpen,
  homePageSlug,
  ...props
}) => {
  const legalSec = useCaisyUpdates(props);
  const link = useCaisyUpdates((legalSec as IGenCompButton)?.link?.[0]);
  return (
    <Link
      {...((legalSec as IGenCompButtonExternalLinks)?.url
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      href={
        legalSec.__typename == "CompButtonExternalLinks" && legalSec?.url
          ? legalSec.url
          : `/${
              (link?.__typename === "Page" &&
                (link?.slug === homePageSlug ? "" : link?.slug ?? "#")) ??
              ""
            }`
      }
    >
      <SHeaderMenuImprintElement
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {legalSec.title ?? ""}
      </SHeaderMenuImprintElement>
    </Link>
  );
};

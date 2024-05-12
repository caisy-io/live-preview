import React, { FC } from "react";
import Link from "next/link";
import { useCaisyUpdates } from "@caisy/live-preview-react";
import {
  IGenCompButton,
  IGenCompButtonExternalLinks,
} from "../../utils/types_gen";

export const FooterLegalLink: FC<any> = ({ homePageSlug, ...props }) => {
  const el = useCaisyUpdates(props);
  const link = useCaisyUpdates((props as IGenCompButton)?.link?.[0]);

  return (
    <>
      <Link
        {...((el as IGenCompButtonExternalLinks)?.url
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        href={
          el.__typename == "CompButtonExternalLinks" && el?.url
            ? el.url
            : `/${
                (link?.__typename === "Page" &&
                  (link?.slug === homePageSlug ? "" : link?.slug ?? "#")) ??
                ""
              }`
        }
      >
        {el.title ?? ""}
      </Link>
    </>
  );
};

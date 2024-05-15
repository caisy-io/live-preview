import React from "react";
import { useCaisyUpdates } from "@caisy/live-preview-react/useCaisyUpdates";
import Link from "next/link";
import { SPageHeaderLinkElement } from "./styles/SPageHeaderLinkElement";

export const PageHeaderNavLink: React.FC<any> = ({
  whiteMode,
  homePageSlug,
  ...props
}) => {
  const link = useCaisyUpdates(props);
  if (!link?.id) {
    return null;
  }

  return (
    <SPageHeaderLinkElement whiteMode={whiteMode}>
      <Link
        legacyBehavior
        href={
          link.__typename === "Page" &&
          (link?.slug === homePageSlug
            ? "/"
            : `/${link?.slug ?? "#noslugincaisy"}`)
        }
      >
        <a>{(link.__typename === "Page" && link?.internalTitle) ?? ""}</a>
      </Link>
    </SPageHeaderLinkElement>
  );
};

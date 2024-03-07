import React, { FC } from "react";
import Link from "next/link";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-javascript/useCaisyUpdates";

export const FooterNavLink: FC<any> = ({ homePageSlug, ...props }) => {
  const el = useCaisyUpdates(props);
  return (
    <Link
      href={`/${el?.slug == homePageSlug ? "" : el?.slug ?? "#"}`}
      key={el?.id}
      legacyBehavior
    >
      {el?.internalTitle ?? ""}
    </Link>
  );
};

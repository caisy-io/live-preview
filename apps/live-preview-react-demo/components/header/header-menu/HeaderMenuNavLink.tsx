import React, { FC } from "react";
import { useCaisyUpdates } from "@nicolasshiken/live-preview-react/useCaisyUpdates";
import Link from "next/link";
import { IGenPage } from "../../../utils/types_gen";
import { SHeaderMenuNavigationElement } from "./styles/SHeaderMenuNavigationElement";

export const HeaderMenuNavLink: FC<any> = ({
  totalAnimationItems,
  isOpen,
  navigationIndex,
  setIsOpen,
  homePageSlug,
  ...props
}) => {
  const element = useCaisyUpdates(props);
  return (
    <Link
      href={
        (element as IGenPage)?.slug === homePageSlug
          ? "/"
          : "/" + (element as IGenPage)?.slug ?? "#"
      }
    >
      <SHeaderMenuNavigationElement
        isOpen={isOpen}
        animationIndex={navigationIndex + 1}
        totalAnimationItems={totalAnimationItems}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {element.__typename === "Page" && element.internalTitle}
      </SHeaderMenuNavigationElement>
    </Link>
  );
};

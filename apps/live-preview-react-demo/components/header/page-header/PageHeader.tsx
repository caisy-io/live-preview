import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CloseLeft } from "../../../constants/svgs/CloseLeft";
import { CloseRight } from "../../../constants/svgs/CloseRight";
import { Rectangle } from "../../../constants/svgs/Rectangle";
import { desiredLanguagesOrder } from "../../../utils/helpers/desiredLanguagesOrder";
import { IGenMainNavigation } from "../../../utils/types_gen";
import { SPageHeader } from "./styles/SPageHeader";
import { SPageHeaderApp } from "./styles/SPageHeaderApp";
import { SPageHeaderClose } from "./styles/SPageHeaderClose";
import { SPageHeaderLinks } from "./styles/SPageHeaderLinks";
import { SPageHeaderLinksContainer } from "./styles/SPageHeaderLinksContainer";
import { SPageHeaderLocal } from "./styles/SPageHeaderLocal";
import { SPageHeaderLocals } from "./styles/SPageHeaderLocals";
import { SPageHeaderLogo } from "./styles/SPageHeaderLogo";
import { SPageHeaderLogoContainer } from "./styles/SPageHeaderLogoContainer";
import { SPageHeaderWrapper } from "./styles/SPageHeaderWrapper";
import { useCaisyUpdates } from "@caisy/live-preview-react";
import { getCaisyInspectProps } from "@caisy/live-preview-react";
import { PageHeaderLogo } from "./PageHeaderLogo";
import { PageHeaderNavLink } from "./PageHeaderNavLink";

interface IPageHeader {
  navigation?: IGenMainNavigation;
  isOpen: boolean;
  firstCompoentHeight: { bronze: number; silver: number };
  setIsOpen: (isOpen: boolean) => void;
}

export const PageHeader: React.FC<
  React.PropsWithChildren<IPageHeader & { homePageSlug?: string }>
> = ({
  navigation: navigationOrg,
  setIsOpen,
  homePageSlug,
  firstCompoentHeight,
  isOpen,
}) => {
  const { locales, asPath, locale } = useRouter();
  const [whiteMode, setWhiteMode] = useState(false);

  const navigation = useCaisyUpdates({
    ...navigationOrg,
  });

  useEffect(() => {
    if (isOpen) {
      setWhiteMode(false);
    } else {
      if (
        (document.documentElement.scrollTop + 100) / window.innerHeight >
        (window.innerWidth > 768
          ? firstCompoentHeight?.silver
          : firstCompoentHeight?.bronze)
      ) {
        setWhiteMode(true);
      } else {
        setWhiteMode(false);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const runOnScroll = () => {
      if (
        (document.documentElement.scrollTop + 100) / window.innerHeight >
        (window.innerWidth > 768
          ? firstCompoentHeight?.silver
          : firstCompoentHeight?.bronze)
      ) {
        setWhiteMode(true);
      } else {
        setWhiteMode(false);
      }
    };
    window.addEventListener("scroll", runOnScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", runOnScroll);
    };
  }, [whiteMode, setWhiteMode, asPath, locale]);

  return (
    <SPageHeader whiteMode={whiteMode}>
      <SPageHeaderLogo
        whiteMode={whiteMode}
        {...getCaisyInspectProps({
          id: navigation.id,
          fieldName: "logo",
        })}
      >
        <PageHeaderLogo
          logo={navigation?.logo}
          logoDark={navigation?.logoDarkVersion}
        ></PageHeaderLogo>
      </SPageHeaderLogo>
      <SPageHeaderLinks whiteMode={whiteMode}>
        <SPageHeaderWrapper>
          <SPageHeaderLogoContainer
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <SPageHeaderClose>
                <CloseLeft />
                <CloseRight />
              </SPageHeaderClose>
            ) : (
              <SPageHeaderApp>
                <Rectangle />
                <Rectangle />
              </SPageHeaderApp>
            )}
          </SPageHeaderLogoContainer>
          <SPageHeaderLocals isOpen={isOpen}>
            {desiredLanguagesOrder(locales).map((l) => (
              <React.Fragment key={`locale-${l}`}>
                <Link href={asPath} locale={l} passHref legacyBehavior>
                  <SPageHeaderLocal whiteMode={whiteMode} active={l === locale}>
                    {l}
                  </SPageHeaderLocal>
                </Link>
              </React.Fragment>
            ))}
          </SPageHeaderLocals>
        </SPageHeaderWrapper>
        <SPageHeaderLinksContainer
          whiteMode={whiteMode}
          {...getCaisyInspectProps({
            id: navigation.id,
            fieldName: "mainNavigation",
          })}
        >
          {navigation?.mainNavigation?.map((link) => (
            <React.Fragment key={link.id}>
              <PageHeaderNavLink
                whiteMode={whiteMode}
                homePageSlug={homePageSlug}
                {...link}
              ></PageHeaderNavLink>
            </React.Fragment>
          ))}
          <SPageHeaderLocals isOpen={true}>
            {desiredLanguagesOrder(locales).map((l) => (
              <React.Fragment key={`locale-${l}`}>
                <Link href={asPath} locale={l} passHref legacyBehavior>
                  <SPageHeaderLocal whiteMode={whiteMode} active={l === locale}>
                    {l}
                  </SPageHeaderLocal>
                </Link>
              </React.Fragment>
            ))}
          </SPageHeaderLocals>
        </SPageHeaderLinksContainer>
      </SPageHeaderLinks>
    </SPageHeader>
  );
};

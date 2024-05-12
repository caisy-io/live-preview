import React from "react";
import { SFooter } from "./styles/SFooter";
import { SFooterLogo } from "./styles/SFooterLogo";
import { SFooterMainNavigation } from "./styles/SFooterMainNavigation";
import { SFooterSectionLocales } from "./styles/SFooterSectionLocales";
import { SFooterSectionLocale } from "./styles/SFooterSectionLocale";
import { SFooterLegalSection } from "./styles/SFooterLegalSection";
import { SFooterCopyright } from "./styles/SFooterCopyright";
import { SFooterLeftSection } from "./styles/SFooterLeftSection";
import { SFooterRightSection } from "./styles/SFooterRightSection";
import { SFooterSections } from "./styles/SFooterSections";
import { SFooterLegalAndCopyright } from "./styles/SFooterLegalAndCopyright";
import { SGridPadding } from "../../base-components/grid-padding/styles/SGridPadding";
import { SFlex } from "../../base-components/flex/styles/SFlex";
import { desiredLanguagesOrder } from "../../utils/helpers/desiredLanguagesOrder";
import { useUniversalText } from "../../provider/universalText";
import { IGenFooter, IGenMainNavigation } from "../../utils/types_gen";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCaisyUpdates } from "@caisy/live-preview-react";
import { getCaisyInspectProps } from "@caisy/live-preview-react";
import { FooterLegalLink } from "./FooterLegalLink";
import { FooterNavLink } from "./FooterNavLink";

export const Footer: React.FC<
  React.PropsWithChildren<{
    homePageSlug?: string;
    is404?: boolean;
    footer?: Omit<IGenFooter, "__typename">;
    navigation?: Omit<IGenMainNavigation, "__typename">;
  }>
> = (props) => {
  const { locales, asPath, locale } = useRouter();

  const { is404, homePageSlug, navigation, footer } = props;
  const { home, logo, mainNavigation } = useCaisyUpdates(navigation);
  const { legalSection } = useCaisyUpdates(footer);

  const universalText = useUniversalText();
  return (
    <SFooter is404={is404}>
      <SGridPadding>
        <SFlex bronze={{ direction: "column" }} silver={{ direction: "row" }}>
          <SFooterLeftSection>
            <SFooterLogo>
              {home?.[0]?.__typename === "Page" && logo?.src && (
                <Link href={`/`} legacyBehavior>
                  <a>
                    <img src={logo.src} alt={logo.title} />
                  </a>
                </Link>
              )}
            </SFooterLogo>
            <SFooterCopyright>
              {`© ${new Date().getFullYear()} ${universalText?.copyright}`}
            </SFooterCopyright>
          </SFooterLeftSection>
          <SFooterRightSection>
            <SFooterSections>
              {mainNavigation && (
                <SFooterMainNavigation
                  {...getCaisyInspectProps({
                    id: navigation.id,
                    fieldName: "mainNavigation",
                  })}
                >
                  {mainNavigation.map((el) => (
                    <FooterNavLink
                      key={el.id}
                      homePageSlug={homePageSlug}
                      {...el}
                    />
                  ))}
                </SFooterMainNavigation>
              )}
            </SFooterSections>
            <SFooterLegalAndCopyright>
              <SFooterSectionLocales>
                {desiredLanguagesOrder(locales).map((l) => (
                  <React.Fragment key={`locale-${l}`}>
                    <Link legacyBehavior href={asPath} locale={l} passHref>
                      <SFooterSectionLocale active={l === locale}>
                        {l}
                      </SFooterSectionLocale>
                    </Link>
                  </React.Fragment>
                ))}
              </SFooterSectionLocales>
              <SFooterLegalSection
                {...getCaisyInspectProps({
                  id: footer.id,
                  fieldName: "legalSection",
                })}
              >
                {legalSection &&
                  legalSection.map((el) => {
                    return (
                      <FooterLegalLink
                        key={el.id}
                        homePageSlug={homePageSlug}
                        {...el}
                      />
                    );
                  })}
              </SFooterLegalSection>
            </SFooterLegalAndCopyright>
            <SFooterCopyright>
              {`© ${new Date().getFullYear()} ${universalText?.copyright}`}
            </SFooterCopyright>
          </SFooterRightSection>
        </SFlex>
      </SGridPadding>
    </SFooter>
  );
};

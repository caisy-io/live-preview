import React from "react";
import {
  IGenCompButton,
  IGenCompButtonExternalLinks,
  IGenFooter_LegalSection,
  IGenMainNavigation,
} from "../../../utils/types_gen";
import { SHeaderGlobalStyle } from "../styles/SHeaderGlobalStyle";
import { SHeaderMenu } from "./styles/SHeaderMenu";
import { SHeaderMenuImprint } from "./styles/SHeaderMenuImprint";
import { SHeaderMenuMainNavigation } from "./styles/SHeaderMenuMainNavigation";
import { HeaderMenuNavLink } from "./HeaderMenuNavLink";
import { HeaderMenuLegalLink } from "./HeaderMenuLegalLink";
interface IHeaderMenu {
  isOpen: boolean;
  navigation: IGenMainNavigation;
  setIsOpen: (x: boolean) => void;
  legalSection: IGenFooter_LegalSection[];
}

export const HeaderMenu: React.FC<
  React.PropsWithChildren<IHeaderMenu & { homePageSlug?: string }>
> = ({ navigation, legalSection, isOpen, homePageSlug, setIsOpen }) => {
  return (
    <SHeaderMenu isOpen={isOpen}>
      <div>
        <SHeaderMenuMainNavigation>
          {navigation?.mainNavigation?.map(
            (element, navigationIndex) =>
              element?.id && (
                <React.Fragment key={element.id}>
                  <HeaderMenuNavLink
                    totalAnimationItems={
                      (navigation?.mainNavigation?.length || 0) + 1
                    }
                    isOpen={isOpen}
                    navigationIndex={navigationIndex}
                    setIsOpen={setIsOpen}
                    homePageSlug={homePageSlug}
                    {...element}
                  ></HeaderMenuNavLink>
                </React.Fragment>
              )
          )}
        </SHeaderMenuMainNavigation>

        <SHeaderMenuImprint
          isOpen={isOpen}
          animationIndex={(navigation?.mainNavigation?.length - 1 || 0) + 1}
          totalAnimationItems={(navigation?.mainNavigation?.length || 0) + 1}
        >
          {legalSection?.map(
            (legalSec: IGenCompButton | IGenCompButtonExternalLinks) =>
              legalSec?.id &&
              legalSec.title && (
                <React.Fragment key={legalSec.id}>
                  <HeaderMenuLegalLink
                    setIsOpen={setIsOpen}
                    homePageSlug={homePageSlug}
                    {...legalSec}
                  ></HeaderMenuLegalLink>
                </React.Fragment>
              )
          )}
        </SHeaderMenuImprint>
        {isOpen && <SHeaderGlobalStyle />}
      </div>
    </SHeaderMenu>
  );
};

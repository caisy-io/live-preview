import React from "react";
import { IGenFooter_LegalSection, IGenMainNavigation } from "../../../utils/types_gen";
interface IHeaderMenu {
    isOpen: boolean;
    navigation: IGenMainNavigation;
    setIsOpen: (x: boolean) => void;
    legalSection: IGenFooter_LegalSection[];
}
export declare const HeaderMenu: React.FC<React.PropsWithChildren<IHeaderMenu & {
    homePageSlug?: string;
}>>;
export {};
//# sourceMappingURL=HeaderMenu.d.ts.map
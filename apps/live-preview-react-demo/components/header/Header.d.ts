import React from "react";
import { IGenFooter_LegalSection, IGenMainNavigation } from "../../utils/types_gen";
interface IHeader {
    legalSection: IGenFooter_LegalSection[];
    firstCompoentHeight: {
        bronze: number;
        silver: number;
    };
}
export declare const Header: React.FC<React.PropsWithChildren<IHeader & IGenMainNavigation & {
    homePageSlug?: string;
}>>;
export {};
//# sourceMappingURL=Header.d.ts.map
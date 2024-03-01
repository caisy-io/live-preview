import React from "react";
import { IGenMainNavigation } from "../../../utils/types_gen";
interface IPageHeader {
    navigation?: IGenMainNavigation;
    isOpen: boolean;
    firstCompoentHeight: {
        bronze: number;
        silver: number;
    };
    setIsOpen: (isOpen: boolean) => void;
}
export declare const PageHeader: React.FC<React.PropsWithChildren<IPageHeader & {
    homePageSlug?: string;
}>>;
export {};
//# sourceMappingURL=PageHeader.d.ts.map
import React from "react";
import { IGenCompFaqItem } from "../../../utils/types_gen";
export interface ICompFaqItem {
    item: IGenCompFaqItem;
    handleActiveFaq: (id: string) => () => void;
    activeId: string;
}
export declare const CompFaqItem: React.FC<React.PropsWithChildren<ICompFaqItem>>;
//# sourceMappingURL=CompFaqItem.d.ts.map
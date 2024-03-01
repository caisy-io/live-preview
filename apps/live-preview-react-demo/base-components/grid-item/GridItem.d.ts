import React from "react";
export interface IGridItemSpecDistance {
    start: number;
    end?: number;
}
export interface IGridItemSpec {
    col: number | IGridItemSpecDistance;
    row?: number | IGridItemSpecDistance;
    order?: number;
}
export interface IGridItem {
    bronze: IGridItemSpec | IGridItemSpecDistance | null;
    silver?: IGridItemSpec | IGridItemSpecDistance | null;
    gold?: IGridItemSpec | IGridItemSpecDistance | null;
    platinum?: IGridItemSpec | IGridItemSpecDistance | null;
    diamond?: IGridItemSpec | IGridItemSpecDistance | null;
}
export declare const GridItem: React.FC<React.PropsWithChildren<IGridItem>>;
//# sourceMappingURL=GridItem.d.ts.map
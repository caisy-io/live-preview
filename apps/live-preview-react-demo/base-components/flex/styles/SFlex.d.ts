interface IFlexDefinition {
    wrap?: "wrap-reverse" | "wrap" | "nowrap";
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-even" | "stretch";
    alignContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-even" | "stretch";
    alignItems?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-even" | "stretch";
}
export interface IFlex extends IFlexDefinition {
    bronze?: IFlexDefinition;
    silver?: IFlexDefinition;
    gold?: IFlexDefinition;
    platinum?: IFlexDefinition;
    diamond?: IFlexDefinition;
}
export declare const SFlex: import("styled-components").StyledComponent<"div", any, IFlex, never>;
export {};
//# sourceMappingURL=SFlex.d.ts.map
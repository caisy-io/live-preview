import { IImg } from "../img/Img";
export interface IAspectDefinition {
    ratio?: number;
    width?: number;
    height?: number;
}
export interface IImageWithAspectRatioProps extends IImg {
    width?: number;
    src: any;
    alt?: string;
    height?: number;
    ratio?: number;
    bronze?: IAspectDefinition | number;
    silver?: IAspectDefinition | number;
    gold?: IAspectDefinition | number;
    platinum?: IAspectDefinition | number;
    diamond?: IAspectDefinition | number;
    contain?: boolean;
}
declare const ImageWithAspectRatio: (props: IImageWithAspectRatioProps) => import("react/jsx-runtime").JSX.Element;
export default ImageWithAspectRatio;
//# sourceMappingURL=ImageWithAspectRatio.d.ts.map
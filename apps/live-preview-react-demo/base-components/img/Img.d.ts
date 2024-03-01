type resolution = {
    width: number;
    height?: number;
};
export interface IImg {
    src: string /** link to file */;
    children?: any;
    alt?: string;
    cover?: boolean;
    contain?: boolean;
    placeholderHeight?: string | number /** lazyload preloader height ==> default: 0 */;
    offset?: number /** offset lazyload trigger ==> default: 100 */;
    resolution: resolution;
    lazyload?: boolean /** should the image be lazyloaded on scroll? ==> default: true */;
    onLoad?: () => void /** trigger when image is loaded ==> default: null */;
}
export declare const Img: ({ lazyload, cover, offset, ...props }: IImg) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Img.d.ts.map
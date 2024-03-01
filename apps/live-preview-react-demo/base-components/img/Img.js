"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_lazy_load_1 = __importDefault(require("react-lazy-load"));
// import {BREAKPOINTS} from "../../constants/styles/mediaquerys";
const SImg_1 = require("./styles/SImg");
const ImgInner = ({ src, alt, children, onLoad, ...props }) => {
    const imgRef = (0, react_1.useRef)();
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    // const resolution= props.resolution || BREAKPOINTS.SILVER
    (0, react_1.useEffect)(() => {
        if (imgRef.current) {
            //@ts-ignore
            if (imgRef.current.complete) {
                setLoaded(true);
                onLoad && onLoad();
            }
            else {
                //@ts-ignore
                imgRef.current.onload = () => {
                    setLoaded(true);
                    onLoad && onLoad();
                };
            }
        }
        return () => {
            //@ts-ignore
            if (imgRef.current && imgRef.current.onload) {
                //@ts-ignore
                imgRef.current.onload = null;
            }
        };
    }, [src, props.resolution]);
    const _src = src && src.substring(src.length - ".svg".length, src.length) === ".svg"
        ? `${src}`.replace("https://caisy.io", "https://assets.caisy.io")
        : `${src}`.replace("https://caisy.io", "https://assets.caisy.io") +
            `${props?.resolution?.height ? `?w=${props.resolution.width}` : ""}${props?.resolution?.height ? `&h=${props.resolution.height}` : ""}`;
    return ((0, jsx_runtime_1.jsxs)(SImg_1.SImg, { loaded: loaded, ...props, children: [(0, jsx_runtime_1.jsx)("img", { src: _src, alt: alt ?? "", ref: imgRef }), children] }));
};
const Img = ({ lazyload = true, cover = true, offset = 100, ...props }) => {
    if (lazyload) {
        return ((0, jsx_runtime_1.jsx)(react_lazy_load_1.default, { height: props.placeholderHeight ? `${props.placeholderHeight}` : undefined, offset: offset, once: true, children: (0, jsx_runtime_1.jsx)(ImgInner, { ...props, cover: cover }) }));
    }
    return (0, jsx_runtime_1.jsx)(ImgInner, { ...props, cover: cover });
};
exports.Img = Img;
